import React, {useState} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WithGoogleLogin = ({ onGoogleLogin, setShowAlertMessage, setAlertMessage }) => {
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("/login");
      if (!response.data) {
        throw new Error("Empty response from server");
      }

      setFirebaseConfig(response.data);
      const app = initializeApp(response.data);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userData = result.user;
      
      try {
        const registered = await axios.get(`/user/${userData.email}`);
        if (registered.data.status === 0) {
          setAlertMessage("El correo electrónico ya fué registrado, utilice otro para registrarse o inicie sesión.");
          setShowAlertMessage(true);
          setTimeout(() => {
            setShowAlertMessage(false);
          }, 5000);
        } else {
          onGoogleLogin(userData);
        }
      } catch (error) {
        console.log("22222222222222222");
        if (error.response.data.status === 1) { //a registrase
          onGoogleLogin(userData);
        }
      }
    } catch (error) {
      console.log("333333333333333");
      console.error("Error signing in with Google:", error.message);
      onGoogleLogin(null);
    }
  };

  return (
    <div className="flex flex-col items-start w-full pt-1">
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline flex items-center justify-center w-full"
        onClick={handleGoogleLogin}
      >
        Registrar con Google
      </button>
    </div>
  );
};

export default WithGoogleLogin;

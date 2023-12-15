import React, {useState} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WithGoogleLogin = ({ onGoogleLogin, setshowAlertMessage, setAlertMessage }) => {
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
        onGoogleLogin(userData);
        if (registered.data.status === 0) {
          // // alert(
          // //   "El usuario ya está registrado. Diríjase al logín o cambie de email si desea registrarse con otro."
          // // );
          // setAlertMessage("El correo electrónico ya fué registrado, utilice otro para registrarse o inicie sesión.");
          // setshowAlertMessage(true);
          // setTimeout(() => {
          // setshowAlertMessage(false);
          // }, 5000);
        }
      } catch (error) {
        if (error.response.data.status === 1) {
          // Llama a la función de devolución de llamada con los datos del usuario
          console.log("a registrarse mostro")
          onGoogleLogin(userData);
        }
      }
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      // Llama a la función de devolución de llamada con el usuario como null en caso de error
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

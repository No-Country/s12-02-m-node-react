import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = ({ setShowAlertMessage, setAlertMessage }) => {
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  const [user, setUser] = useState(null);
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
      setUser(userData);

      try {
        const registered = await axios.get(`/user/${userData.email}`);
        if (registered.data.status === 0) {
          localStorage.setItem("user", JSON.stringify(registered.data.data));
          navigate("/");
        }
      } catch (error) {
        if (error.response.data.status === 1) {
          setAlertMessage("El correo electrónico no está registrado.");
          setShowAlertMessage(true);
        }
      }
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-14 rounded focus:outline-none focus:shadow-outline flex items-center"
        onClick={handleGoogleLogin}
      >
        Continuar con Google
      </button>
    </div>
  );
};

export default GoogleLogin;

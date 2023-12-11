import { FaGoogle, FaFacebook } from 'react-icons/fa';
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);  // Nuevo estado para almacenar el usuario
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    // Lógica para iniciar sesión con Google
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
        setUser(userData);  // Actualizar el estado de usuario
  
        try {
          const registered = await axios.get(
            `/user/${userData.email}`
          );
  
          if (registered.data.status === 0) {
            localStorage.setItem("user", JSON.stringify(registered.data.data));
            localStorage.setItem("token", userData.accessToken);
            navigate("/");
          }
        } catch (error) {
          if (error.response.data.status === 1) {
            // MATEO el estado userData tiene los datos para que se los pases al form de registro
            alert("Usted no está registrado en nuestro sitio, tiene que registrarse")
          }
          
        }
      } catch (error) {
        console.error("Error signing in with Google:", error.message);
      }
    
  };

  return (
    <div className="flex flex-col items-start w-full">
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline flex items-center w-5/5"
        onClick={handleGoogleLogin}
      >
        <FaGoogle className="mr-4" />
        Continuar con Google
      </button>
    </div>
  );
};

export default GoogleLogin;
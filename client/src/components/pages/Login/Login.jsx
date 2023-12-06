import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  const navigate = useNavigate();
  let user = {};

  const signInWithGoogle = async () => {
    try {
      const response = await axios.get("http://localhost:3031/api/login");
      if (!response.data) {
        throw new Error("Empty response from server");
      }
      setFirebaseConfig(response.data);
      const app = initializeApp(response.data);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      user = result.user;
      try {
        const registered = await axios.get(
          `http://localhost:3031/api/user/${user.email}`
        );
        if (registered.data.status === 0) {
          localStorage.setItem("user", JSON.stringify(registered.data.data));
          localStorage.setItem("token", user.accessToken);
          navigate("/");
        }
      } catch (error) {
        if (error.response.data.status === 1) { //Registracion
          const userData = {
            names: user.displayName,
            lastname: "",
            birthDate: "",
            email: user.email,
            country: "",
          };
          const registracion = await axios.post(
            `http://localhost:3031/api/user`,
            userData
          );
          localStorage.setItem("user", JSON.stringify(registered.data.data));
          localStorage.setItem("token", user.accessToken);
          navigate("/");
        }
        console.error(
          "Error en la segunda llamada a axios:",
          error.response.data
        );
      }
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="App">
      <h1>EventWave ATR</h1>
      <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
    </div>
  );
}

export default Login;

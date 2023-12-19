import React, { useState, useEffect } from "react";
import GoogleLogin from "../../molecules/loginElements/loginGoogle";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/userSlice";

const LoginModal = () => {
  const dispatch = useDispatch()
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: true,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShowPassword = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/login");
      if (!response.data) {
        throw new Error("Respuesta vacía del servidor");
      }

      setFirebaseConfig(response.data);
      const app = initializeApp(response.data);
      const auth = getAuth(app);

      const result = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userData = result.user;
      setUser(userData);

      try {
        const registered = await axios.get(`/user/${userData.email}`);

        if (registered.data.status === 0) {
          setIsShowRegister(false);
          localStorage.setItem("user", JSON.stringify(registered.data.data));
          navigate("/");
        }
      } catch (error) {
        console.log("Error al obtener información del usuario:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.status === 1
        ) {
          setIsShowRegister(true);
          console.log("A registrarse, mostro");
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión con correo y contraseña:",error.message);
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        console.log("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.");
        setAlertMessage("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.");
        setShowAlertMessage(true);
      } else {
        console.log("Error de autenticación:", error.message);
      }
    }
  };

  useEffect(() => {
    if (showAlertMessage) {
      const timeoutId = setTimeout(() => {
        setShowAlertMessage(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlertMessage]);

  const toHome = () => {
    navigate("/");
  };

  return (
    <div className="relative flex flex-col bg-white rounded-lg border-none w-3.5/5 justify-between items-center p-8 pb-10 mt-12">
      <IoMdClose
        className="absolute top-4 right-4 text-gray-600 cursor-pointer"
        size={24}
        onClick={toHome}
      />
      <h1 className="text-black text-center font-poppins text-5xl font-semibold leading-tight mb-2">
        Inicia Sesión
      </h1>
      <h3 className="text-center text-base mb-6">Ingresa tus credenciales</h3>
      {showAlertMessage && (
        <div>
          <p className="bg-red-500 text-white font-medium py-2 px-5 mb-2 focus:outline-none focus:shadow-outline">
            {alertMessage}
          </p>
        </div>
      )}
 
      <form className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-col w-2/5">
          <div className="flex pb-5 justify-center items-center w-full">
            <input
              className="border-b border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex pb-5 justify-center items-center w-full">
            <input
              className="border-b border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
              id="password"
              type={formData.showPassword ? "password" : "text"}
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center w-2/5"
          onClick={handleSubmit}
        >
          Inicia Sesión
        </button>
        <p className="flex m-1">o</p>
      </form>

      <div className="flex flex-col justify-between items-center mb-4 w-full">
        <div className="flex-1">
          <GoogleLogin 
            setShowAlertMessage={setShowAlertMessage}
            setAlertMessage={setAlertMessage}
          />
        </div>
      </div>

      <div className="text-gray-600 text-xs mt-6">
        <p className="border-b border-gray-300 pb-2 mb-2">
          *Al iniciar sesión, aceptas nuestras Condiciones de Servicio y
          reconoces que has leído nuestra Política de Privacidad{" "}
        </p>
        <p>
          Este sitio está protegido por Eventeware int. Se aplican la Política
          de Privacidad y las Condiciones de Servicio de Google.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;

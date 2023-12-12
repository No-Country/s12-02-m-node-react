import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import WithGoogleLogin from "../../molecules/registerElements/registerWithGoogle";
import axios from "axios";

//registro con Google intento de inicio
const RegisterModalDirect = (user) => {
  const [formData, setFormData] = useState({
    names: "",
    lastname: "",
    email: "",
    country: "",
    birthDate: "01/01/2000",
    picture: "",
    password: "",
    showPassword: true,
  });
  if (user=={}) {
    formData.names = user.user.displayName;
    formData.email = user.user.email;
    formData.picture = user.user.photoURL || "";
  }
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
      const response = await axios.post("/user", formData);
      if (response.data.status === 0) {
        toHome();
      }
    } catch (error) {
      if (error.response && error.response.data.status === 2) {
        alert("El correo electrónico ya existe!");
      }
      console.error("Error al registrar usuario:", error.response ? error.response.data.message : error.message);
    }
  };
  
  

  const navigate = useNavigate();

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
      <h1 className="text-black text-center font-poppins text-5xl font-semibold leading-tight mb-4">
        Regístrate
      </h1>
      {/* Formulario para registrarse, inputs de name, lastname, birthdate, country, email y password */}

      <form className="flex flex-col max-w-6xl w-full pl-10 pt-5">
        <h2 className="text-1xl font-bold mb-10">
          Completa los datos para registrarte
        </h2>
        
                <div className="flex-1">
                    <WithGoogleLogin />
                </div>
            
        <div className="flex flex-wrap w-full">
          <div className="w-full sm:w-1/2 px-2 mb-10">
          <input
              className="border-b border-gray-500 w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
              id="names"
              type="text"
              placeholder="Nombre"
              name="names"
              value={formData.names}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <input
              className="border-b border-gray-500 w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
              id="lastname"
              type="text"
              placeholder="Apellido"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <input
              className="border-b border-gray-500 w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
              id="birthDate"
              type="date"
              placeholder="Fecha de Nacimiento"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <input
              className="border-b border-gray-500 w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
              id="country"
              type="text"
              placeholder="País"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <input
              className="border-b border-gray-500 w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <div className="flex items-center">
              <input
                className="border-b border-gray-500 w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
                id="password"
                type={formData.showPassword ? "password" : "text"}
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Registrarse
          </button>
        </div>
      </form>
      <div className="text-gray-600 text-xs">
        <p className="border-b border-gray-300 pb-2 mb-2">
          *Al registrarte, aceptas nuestras Condiciones de Servicio y reconoces
          que has leído nuestra Política de Privacidad{" "}
        </p>
        <p>
          Este sitio está protegido por Eventeware int. Se aplican la Política
          de Privacidad y las Condiciones de Servicio de Google.
        </p>
      </div>
    </div>
  );
};

export default RegisterModalDirect;

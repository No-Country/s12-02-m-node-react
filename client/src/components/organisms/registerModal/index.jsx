import React, { useState } from 'react';
import RegisterButton from "../../molecules/registerElements/registerButton";
import GoogleLogin from "../../molecules/registerElements/registerGoogle";
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

const RegisterModal = (user) => {

    const [formData, setFormData] = useState({
        // name: user.user.displayName,
        // email: user.user.email,
        name: "",
        email: "",
        password: '',
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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
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
            <h1 className="text-black text-center font-poppins text-5xl font-semibold leading-tight mb-4">Regístrate</h1>
            <h3 className="text-center text-base mb-4">
                ¿Ya tienes una cuenta? Inicia Sesión
            </h3>

            {/* Formulario para iniciar sesion, inputs de Email y Contraseña */}

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
                      type={formData.showPassword ? 'password' : 'text'}
                      placeholder="Contraseña"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                </div>
              </div>
              <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center w-2/5"
                  onClick={""}
                >
                  Inicia Sesión
              </button>
              <p className='flex m-1'>o</p>
            </form>

            <div className="flex flex-col justify-between items-center mb-4 w-full">
                <div className="flex-1">
                    <GoogleLogin />
                </div>
                <div className="flex-1">
                    <h3 className="text-center text-base mt-6 border-t border-gray-300 pt-4">
                        ¿Quieres registrarte manualmente?{" "}
                    </h3>
                    <div>
                    <RegisterButton />
                </div>
                </div>
            </div>

            <div className="text-gray-600 text-xs">
                <p className="border-b border-gray-300 pb-2 mb-2">*Al registrarte, aceptas nuestras Condiciones de Servicio y reconoces que has leído nuestra Política de Privacidad </p>
                <p>Este sitio está protegido por Eventeware int. Se aplican la Política de Privacidad y las Condiciones de Servicio de Google.</p>
            </div>

        </div>
    );
};

export default RegisterModal

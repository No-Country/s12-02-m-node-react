import React, { useState } from 'react';
import GoogleLogin from '../../molecules/loginElements/loginGoogle';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from "axios";
import RegisterModal from '../registerModal';

const LoginModal = () => {
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  const [user, setUser] = useState(null);
  const [isShowRegister, setIsShowRegister] = useState(false); // Nuevo estado para verificar si el usuario está registrado
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
      
        try {
          const response = await axios.get("/login");
          if (!response.data) {
            throw new Error("Empty response from server");
          }
    
          setFirebaseConfig(response.data);
          const app = initializeApp(response.data);
          const auth = getAuth(app);
      
          // Autenticación con correo electrónico y contraseña
          const result = await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );
      
          const userData = result.user;
          setUser(userData);
        
          try {
            // Realiza las operaciones adicionales según tus necesidades
            const registered = await axios.get(`/user/${userData.email}`);
            console.log(registered)
            if (registered.data.status === 0) {
              setIsShowRegister(false);
              localStorage.setItem('user', JSON.stringify(registered.data.data));
              navigate('/');
            }
          } catch (error) {
            if (error.response.data.status === 1) {
              setIsShowRegister(true);
              console.log('a registrarse mostro');
            }
          }
        } catch (error) {
          console.error('Error signing in with email and password:', error.message);
        }
      };
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
            <h1 className="text-black text-center font-poppins text-5xl font-semibold leading-tight mb-4">Inicia Sesión</h1>
            <h3 className="text-center text-base mb-4">
                Ingresa tus credenciales 
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
                  onClick={handleSubmit}
                >
                  Inicia Sesión
              </button>
              <p className='flex m-1'>o</p>
            </form>
            {isShowRegister && user && (
        <RegisterModal user={user}/>
      )}
            <div className="flex flex-col justify-between items-center mb-4 w-full">
                <div className="flex-1">
                    <GoogleLogin user={user}/>
                </div>
            </div>

            <div className="text-gray-600 text-xs">
                <p className="border-b border-gray-300 pb-2 mb-2">*Al iniciar sesión, aceptas nuestras Condiciones de Servicio y reconoces que has leído nuestra Política de Privacidad </p>
                <p>Este sitio está protegido por Eventeware int. Se aplican la Política de Privacidad y las Condiciones de Servicio de Google.</p>
            </div>

        </div>
    );
};

export default LoginModal
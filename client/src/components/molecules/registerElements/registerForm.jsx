import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegisterForm (){
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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
        // Agrega lógica para enviar los datos del formulario al servidor
        console.log('Datos enviados:', formData);
      };
    
      return (
        <div className="flex justify-center items-center h-auto pt-4 pb-4">
          <form className="flex flex-col gap-5 w-80">
            <div className="mb-4">
              <input
                className="border-b border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
                id="name"
                type="text"
                placeholder="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
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
            <div className="mb-6 relative">
              <div className="flex items-center">
                <input
                  className="border-b border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
                  id="password"
                  type={formData.showPassword ? 'password' : 'text'}
                  placeholder="Contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="ml-2">
                  {formData.showPassword ? (
                    <FaEyeSlash
                      className="text-gray-500 cursor-pointer"
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <FaEye
                      className="text-gray-500 cursor-pointer"
                      onClick={toggleShowPassword}
                    />
                  )}
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
        </div>
      );
    };
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';

const RegisterForm = ({ isOpen, onRequestClose }) => {
    
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
      return (
        
      <Modal className="" isOpen={isOpen} onRequestClose={onRequestClose}
              style={{
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)', },
                content: { width: 'auto', height: 'fit-content', maxWidth: '60%', margin: 'auto', padding: '15px', borderRadius: '10px', },
              }}>
          <div className="flex justify-center items-center pt-4 pb-6">
            <button className="absolute top-4 right-4 text-gray-600 cursor-pointer" onClick={onRequestClose}><IoMdClose/></button>

            {/* Formulario para registrarse, inputs de name, lastname, birthdate, country, email y password */}

            <form className="flex flex-col max-w-6xl w-full pl-10 pt-5">
              <h2 className="text-2xl font-bold mb-10">Completa los datos para registrarte</h2>
              <div className="flex flex-wrap w-full">
              <div className="w-full sm:w-1/2 px-2 mb-10">
                <input
                  className="border-b border-gray-500 w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black"
                  id="name"
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  value={formData.name}
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
                  id="birthdate"
                  type="date"
                  placeholder="Fecha de Nacimiento"
                  name="birthdate"
                  value={formData.birthdate}
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
                      type={formData.showPassword ? 'password' : 'text'}
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

        </div>
        <div className="text-gray-600 text-xs text-center mt-4">
            <p className="border-b border-gray-300 pb-2 mb-2">*Al registrarte, aceptas nuestras Condiciones de Servicio y reconoces que has leído nuestra Política de Privacidad </p>
            <p>Este sitio está protegido por Eventeware int. Se aplican la Política de Privacidad y las Condiciones de Servicio de Google.</p>
        </div>
      </Modal>
      );
    };

export default RegisterForm
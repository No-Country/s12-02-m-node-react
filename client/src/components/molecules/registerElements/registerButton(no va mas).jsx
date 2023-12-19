import React, { useState } from 'react';
import RegisterForm from './registerForm';

const RegisterButton = () => {

    const [modalAbierto, setModalAbierto] = useState(false);

    const abrirModal = () => {
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
    };

  return (
    <div className="flex flex-col w-full">
      <button
        className="bg-white hover:bg-black text-black hover:text-white border border-black border-solid font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 mt-4 flex items-center justify-center w-auto"
        onClick={abrirModal}
      >
        Regístrate
      </button>
      <RegisterForm isOpen={modalAbierto} onRequestClose={cerrarModal} />
    </div>
  );
};

export default RegisterButton;
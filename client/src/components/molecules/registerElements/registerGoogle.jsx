import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    // Lógica para iniciar sesión con Google
  };

  return (
    <div className="flex flex-col items-start">
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 flex items-center w-full"
        onClick={handleGoogleLogin}
      >
        <FaGoogle className="mr-2" />
        Continuar con Google
      </button>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center w-full"
        onClick={""}
      >
        Inicia Sesión
      </button>
    </div>
  );
};

export default GoogleLogin;
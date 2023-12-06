import RegisterForm from "../../molecules/registerElements/registerForm";
import SocialAuthButtons from "../../molecules/registerElements/registerGoogle";
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

const RegisterModal = () => {
    
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
                ¿Ya tienes una cuenta?{" "}
                <a href="#" className="text-blue-500 hover:underline" onClick={""}> Inicia Sesión </a>
            </h3>
            <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex-1 pr-4">
                    <RegisterForm />
                </div>
                <div className="border-1 border-gray-300 h-60 mx-8"></div>
                <div className="flex-1 pl-4">
                    <SocialAuthButtons />
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

import { Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";
import { ImHeadphones } from "react-icons/im";
function Footer() {
  return (
    <div className="bg-black w-full flex flex-col text-white items-center">
      <div className="flex justify-between w-4/5 py-10">
        <div className="flex justify-center m-2 ">
          <ImHeadphones className="text-2xl mr-1 mt-1" />
          <p className="text-2xl">Event</p>
          <p className="text-gray-400 text-2xl">Wave</p>
        </div>
        <div className="flex py-5">
          <div className="flex flex-col items-start justify-center m-2 px-7">
            <h3 className="mb-2 font-poppins font-bold">Tu cuenta</h3>
            <button className="my-2 font-poppins">Registrarse</button>
            <button className="my-2 font-poppins">Iniciar sesión</button>
            <button className="my-2 font-poppins">Organizar un evento</button>
            <button className="my-2 font-poppins">Afíliate</button>
            <button className="my-2 font-poppins">Ayuda</button>
          </div>
          <div className="flex flex-col items-start justify-center m-2 px-7">
            <h3 className="mb-2 font-poppins font-bold">Descubrir</h3>
            <button className="my-2 font-poppins">Eventos en linea</button>
            <button className="my-2 font-poppins">Cursos y talleres</button>
            <button className="my-2 font-poppins">
              Recitales y conciertos
            </button>
            <button className="my-2 font-poppins">Guías locales</button>
            <button className="my-2 font-poppins">Puntos de venta</button>
          </div>
          <div className="flex flex-col items-start justify-center m-2 px-7">
            <h3 className="mb-2 font-poppins font-bold">Sobre Eventwave</h3>
            <button className="my-2 font-poppins">Contacto y soporte</button>
            <button className="my-2 font-poppins">Quienes somos</button>
            <button className="my-2 font-poppins">Trabaja con nosotros</button>
            <button className="my-2 font-poppins">
              Términos y condiciones
            </button>
            <button className="my-2 font-poppins">
              Política de privacidad
            </button>
          </div>
          <div className="flex flex-col items-start m-2">
            <h3 className="mb-2 font-poppins font-bold">Siguenos</h3>
            <div className="flex mt-2">
              <Instagram className="m-1" />
              <FaXTwitter className="text-2xl m-1" />
              <Facebook className="m-1" />
              <FaTiktok className="text-2xl m-1" />
              <Youtube className="m-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-4/5 justify-between items-center py-10 border-t-2 border-white">
        <div>
          <p className="my-1 font-poppins">
            EventWare© 2023. Todos los derechos reservados
          </p>
        </div>
        <div className="flex items-center">
          <GrLanguage className="m-2" />
          <button className="m-2 font-poppins ">Español </button>
          <button className="m-2 font-poppins ">English </button>
          <button className="m-2 font-poppins  ">Portugues </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;

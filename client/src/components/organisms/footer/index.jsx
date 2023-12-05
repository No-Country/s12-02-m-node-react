import { Accordion, AccordionItem } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

import { Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";
import { ImHeadphones } from "react-icons/im";

function Footer() {
  const itemClasses = {
    base: "py-0 w-full",
    title: "text-white hover:text-secondary-3",
    trigger: "px-2 py-0 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  const footerLinks = [
    {
      linksTitle: "Tu Cuenta",
      links: [
        {
          to: "/",
          text: "Registrarse",
        },
        {
          to: "/",
          text: "Iniciar Sesión",
        },
        {
          to: "/",
          text: "Organizar Evento",
        },
        {
          to: "/",
          text: "Afiliate",
        },
        {
          to: "/",
          text: "Ayuda",
        },
      ],
    },
    {
      linksTitle: "Descubrir",
      links: [
        {
          to: "/",
          text: "Eventos en linea",
        },
        {
          to: "/",
          text: "Cursos y talleres",
        },
        {
          to: "/",
          text: "Recitales y conciertos",
        },
        {
          to: "/",
          text: "Guias locales",
        },
        {
          to: "/",
          text: "Puntos de venta",
        },
      ],
    },
    {
      linksTitle: "Sobre Eventwave",
      links: [
        {
          to: "/",
          text: "Contacto y soporte",
        },
        {
          to: "/",
          text: "Quienes somos",
        },
        {
          to: "/",
          text: "Trabaja con nosotros",
        },
        {
          to: "/",
          text: "Términos y condiciones",
        },
        {
          to: "/",
          text: "Politica de privacidad",
        },
      ],
    },
  ];
  return (
    <div className="bg-black w-full flex flex-col text-white items-center ">
      <div className="flex flex-col justify-between w-4/5 py-10">
        <div className="flex justify-center m-2 ">
          <ImHeadphones className="text-2xl mr-1 mt-1" />
          <p className="text-2xl">Event</p>
          <p className="text-gray-400 text-2xl">Wave</p>
        </div>
        <Accordion variant="light" itemClasses={itemClasses}>
          {footerLinks.map((section) => (
            <AccordionItem
              key={section.linksTitle}
              aria-label={`${section.linksTitle} Accordion`}
              title={section.linksTitle}
              className="text-white"
            >
              <ul className="flex flex-col gap-2 items-center">
                {section.links.map((link) => (
                  <li>
                    <NavLink
                      to={link.to}
                      className="text-primary-1 text-medium font-thin hover:text-secondary-3 focus:text-secondary-3"
                    >
                      {link.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex flex-col items-start m-2">
            <h3 className="mb-2 font-bold">Siguenos</h3>
            <div className="flex mt-2">
              <Instagram className="m-1" />
              <FaXTwitter className="text-2xl m-1" />
              <Facebook className="m-1" />
              <FaTiktok className="text-2xl m-1" />
              <Youtube className="m-1" />
            </div>
          </div>
        {/* <div className="flex py-5">
          <div className="flex flex-col items-start justify-center m-2 px-7">
            <h3 className="mb-2 font-bold">Tu cuenta</h3>
            <button className="my-2">Registrarse</button>
            <button className="my-2">Iniciar sesión</button>
            <button className="my-2">Organizar un evento</button>
            <button className="my-2">Afíliate</button>
            <button className="my-2">Ayuda</button>
          </div>
          <div className="flex flex-col items-start justify-center m-2 px-7">
            <h3 className="mb-2 font-bold">Descubrir</h3>
            <button className="my-2">Eventos en linea</button>
            <button className="my-2">Cursos y talleres</button>
            <button className="my-2">
              Recitales y conciertos
            </button>
            <button className="my-2">Guías locales</button>
            <button className="my-2">Puntos de venta</button>
          </div>
          <div className="flex flex-col items-start justify-center m-2 px-7">
            <h3 className="mb-2 font-bold">Sobre Eventwave</h3>
            <button className="my-2">Contacto y soporte</button>
            <button className="my-2">Quienes somos</button>
            <button className="my-2">Trabaja con nosotros</button>
            <button className="my-2">
              Términos y condiciones
            </button>
            <button className="my-2">
              Política de privacidad
            </button>
          </div>
          <div className="flex flex-col items-start m-2">
            <h3 className="mb-2 font-bold">Siguenos</h3>
            <div className="flex mt-2">
              <Instagram className="m-1" />
              <FaXTwitter className="text-2xl m-1" />
              <Facebook className="m-1" />
              <FaTiktok className="text-2xl m-1" />
              <Youtube className="m-1" />
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex w-4/5 justify-between items-center py-10 border-t-2 border-white">
        <div>
          <p className="my-1">EventWare© 2023. Todos los derechos reservados</p>
        </div>
        <div className="flex items-center">
          <GrLanguage className="m-2" />
          <button className="m-2 ">Español </button>
          <button className="m-2 ">English </button>
          <button className="m-2  ">Portugues </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;

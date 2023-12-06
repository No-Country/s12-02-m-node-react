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
    <div className="bg-black w-full flex flex-col text-white items-center px-5 lg:px-10">
      <div className="flex flex-col lg:flex-row justify-between w-full py-10">
        <div className="flex justify-center m-2 lg:mt-0">
          <ImHeadphones className="text-2xl mr-1 mt-1" />
          <p className="text-2xl">Event</p>
          <p className="text-gray-400 text-2xl">Wave</p>
        </div>
        <section className="lg:hidden">
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
        </section>
        <section className="hidden lg:flex flex-grow justify-evenly">
          {footerLinks.map((section) => (
            <div>
              <h3 className="font-semibold text-lg mb-2">{section.linksTitle}</h3>
              <ul>
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
            </div>
          ))}
        </section>
        <div className="flex flex-col items-start m-2 lg:m-0">
          <h3 className="mb-2 text-lg font-semibold">Siguenos</h3>
          <div className="flex items-center gap-2 mt-2">
            <Instagram />
            <FaXTwitter className="text-2xl m-1" />
            <Facebook />
            <FaTiktok className="text-2xl m-1" />
            <Youtube />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between w-full items-center py-7 border-t-2 border-white">
        <div>
          <p className="my-1 text-center">
            EventWare© 2023. Todos los derechos reservados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GrLanguage />
          <button>Español </button>
          <button>English </button>
          <button>Portugues </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;

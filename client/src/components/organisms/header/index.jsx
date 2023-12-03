import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import NavbarHeader from "../../molecules/navbarHeader";
import NavbarButton from "../../atoms/navbarButton";
import Searcher from "../../atoms/searcher";
import UserIcon from "../../atoms/UserIcon";
import UserHeaderMenu from "../../atoms/UserHeaderMenu";

import { useState, useEffect } from "react";

function Header() {
  const [isLogged, setIsLogged] = useState(true);
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [closeMenuTimeOut, setCloseMenuTimeOut] = useState(null);

  const [userInfo, setUserInfo] = useState({ name: "Capipop" });

  const navigate = useNavigate();

  const headerMenuOptions = [
    {
      text: "Mi Cuenta",
      redirect: "/Myaccount",
    },
    {
      text: "Reservas",
      redirect: "/booked",
    },
    {
      text: "Cerrar Sesión",
      redirect: "/Logout",
    },
  ];

  const toRegister = () => {
    navigate("/Register");
  };

const closeMenu = () => {
  let timeout = setTimeout(() => {
    setIsMenuToggled(false)
  }, 200);
  setCloseMenuTimeOut(timeout)
}

  const toLogin = () => {
    navigate("/Login");
  };

  const renderLogSection = () => {
    if (isLogged) {
      return (
        <div className="relative flex items-center gap-2 mr-10">
          <UserIcon />
          <button
            className="group flex focus:outline-none"
            onClick={() => setIsMenuToggled((prev) => !prev)}
            onBlur={closeMenu}
            data-test="UserMenuToggle"
          >
            <span className='hover:text-secondary-3 group-focus:text-secondary-3' >{userInfo.name}</span>
            <ChevronLeft
              className={`transform ${
                isMenuToggled ? "-rotate-90":'group-hover:-rotate-90 group-focus:-rotate-90'
              } transition-transform duration-300 ease-in-out`}
            />
          </button>
          {isMenuToggled && <UserHeaderMenu options={headerMenuOptions} toCancelClose= {closeMenuTimeOut} toCloseMenu={closeMenu} />}
        </div>
      );
    }
    return (
      <div className="flex gap-4 mr-10 items-center">
        <NavbarButton
          filled={false}
          text={"Iniciar Sesión"}
          handler={toLogin}
        />
        <NavbarButton filled text={"Registrarse"} handler={toRegister} />
      </div>
    );
  };

  return (
    <header className="w-full h-32 py-2 flex items-center justify-between bg-gradient-to-b from-black to-secondary-1 text-primary-1 sticky top-0 z-50">
      <picture
        onClick={() => navigate("/")}
        className="h-14 overflow-hidden ml-10 mb-4"
      >
        <img
          className="h-full w-auto object-contain"
          src="https://media.discordapp.net/attachments/1176511259093516384/1180139581736222870/image.png?ex=657c55a2&is=6569e0a2&hm=a399b0f29e8da2d1cd93c6d9d7330f9bced19efac8d73457bc1e30c779327a2b&=&format=webp&quality=lossless&width=606&height=160"
          alt="logo"
        />
      </picture>
      <Searcher />
      <NavbarHeader />
      {renderLogSection()}
    </header>
  );
}

export default Header;

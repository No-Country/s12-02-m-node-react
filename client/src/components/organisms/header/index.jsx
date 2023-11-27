import NavbarHeader from "../../molecules/navbarHeader";
import NavbarButton from "../../atoms/navbarButton";
import { useNavigate } from "react-router-dom";
import Searcher from "../../atoms/searcher";

function Header() {
  const navigate = useNavigate();
  const toRegister = () => {
    navigate("/Register");
  };
  const toLogin = () => {
    navigate("/Login");
  };
  return (
    <header className="w-full h-32 py-2 flex items-center justify-between bg-gradient-to-b from-black to-secondary-1 text-primary-1 sticky top-0">
      <picture
        onClick={() => navigate("/")}
        className="h-16 overflow-hidden ml-10"
      >
        <img
          className="h-full w-auto object-contain"
          src="https://media.discordapp.net/attachments/1176511259093516384/1178785895416082544/image.png?ex=657768ea&is=6564f3ea&hm=39253153cadff1ee9f0c0fdb33e56f360b33c1719dbd238fd765522b2ebc5c03&=&format=webp&width=704&height=224"
          alt="logo"
        />
      </picture>
      <Searcher />
      <NavbarHeader />
      <div className="flex gap-4 mr-10 items-center">
        <NavbarButton
          filled={false}
          text={"Iniciar Sesión"}
          handler={toLogin}
        />
        <NavbarButton filled text={"Registrarse"} handler={toRegister} />
      </div>
    </header>
  );
}

export default Header;

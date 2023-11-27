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
    <header className="w-full h-32 py-2 flex items-center justify-between bg-gradient-to-b from-black to-secondary-1 text-primary-1">
      <p>Logo</p>
      <Searcher />
      <NavbarHeader />
      <div className="flex gap-4 mr-4">
        <NavbarButton filled={false} text={"Iniciar Sesión"} handler={toLogin} />
        <NavbarButton filled text={"Registrarse"} handler={toRegister} />
      </div>
    </header>
  );
}

export default Header;

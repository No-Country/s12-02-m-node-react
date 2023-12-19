import NavBarItem from "../../atoms/navbarItem";

function NavbarHeader({ className, isLogged }) {
  const items = [
    {
      text: "Inicio",
      route: "/",
      dataTest: "link_inicio",
    },
    {
      text: "Novedades",
      route: "/News",
      dataTest: "link_novedades",
    },
    {
      text: "Crear Eventos",
      route: "/CreateEvent",
      dataTest: "link_crear-eventos",
    },
  ];
  const renderNavItems = () => {
    if (isLogged) {
      return items.map((item) => (
        <NavBarItem
          key={item.route}
          text={item.text}
          route={item.route}
          dataTest={item.dataTest}
        />
      ));
    }
    const noLogged = items.filter(item => item.text != 'Crear Eventos')
    return noLogged.map((item) => (
      <NavBarItem
        key={item.route}
        text={item.text}
        route={item.route}
        dataTest={item.dataTest}
      />
    ));
  };
  return (
    <nav className={`${className}`}>
      <ul
        className={`list-none flex gap-5 items-center justify-evenly flex-wrap lg:justify-center`}
      >
        {renderNavItems()}
      </ul>
    </nav>
  );
}

export default NavbarHeader;

import NavBarItem from '../../atoms/navbarItem'

function NavbarHeader({className}) {
  const items = [
    {
      text: 'Inicio',
      route: '/',
      dataTest: 'link_inicio',
    },
    {
      text: 'Eventos',
      route: '/Events',
      dataTest: 'link_eventos',
    },
    {
      text: 'Novedades',
      route: '/News',
      dataTest: 'link_novedades',
    },
    {
      text: 'Crear Eventos',
      route: '/Create-Event',
      dataTest: 'link_crear-eventos',
    },
    
  ]
  return (
    <nav className={`${className}`}>
      <ul className={`list-none flex gap-5 items-center justify-evenly flex-wrap lg:justify-center`}>
        {items.map(item =>(
          <NavBarItem key={item.route} text={item.text} route={item.route} dataTest={item.dataTest} />
        ))}
      </ul>
    </nav>
  )
}

export default NavbarHeader

import NavBarItem from '../../atoms/navbarItem'

function NavbarHeader({className}) {
  const items = [
    {
      text: 'Inicio',
      route: '/'
    },
    {
      text: 'Eventos',
      route: '/Events'
    },
    {
      text: 'Crear Eventos',
      route: '/Create-Event'
    },
    {
      text: 'Novedades',
      route: '/News'
    },
    
  ]
  return (
    <nav className={`${className}`}>
      <ul className={`list-none flex gap-5 items-center justify-evenly flex-wrap lg:justify-center`}>
        {items.map(item =>(
          <NavBarItem key={item.route} text={item.text} route={item.route}/>
        ))}
      </ul>
    </nav>
  )
}

export default NavbarHeader

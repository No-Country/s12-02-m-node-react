import NavBarItem from '../../atoms/navbarItem'

function NavbarHeader() {
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
    <nav>
      <ul className='list-none flex gap-5 items-center'>
        {items.map(item =>(
          <NavBarItem key={item.route} text={item.text} route={item.route}/>
        ))}
      </ul>
    </nav>
  )
}

export default NavbarHeader

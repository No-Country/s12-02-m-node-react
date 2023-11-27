import Header from '../../organisms/header'
import Footer from '../../organisms/footer'
import { Outlet } from 'react-router-dom'

function Layout () {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
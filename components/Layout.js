import Header from './Header'
import Footer from './Footer'
import Sidenav from './Sidenav'

const Layout = ({ children }) => {
    return (
        <div id="layout">
            <Sidenav />
            <div id="right">
                <Header />
                <main id="pages">{ children }</main>
                <Footer />
            </div>
        </div>

    );
}

export default Layout;
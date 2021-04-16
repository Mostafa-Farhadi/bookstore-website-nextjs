
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div id="layout">
            <Header />
            <main id="pages">{ children }</main>
            <Footer />
        </div>
    );
}

export default Layout;
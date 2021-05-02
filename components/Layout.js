
import Header from './Header';
import Footer from './Footer';
import Style from '../styles/components/layout.module.scss'

const Layout = ({ children }) => {
    return (
        <div className={Style.layout}>
            <Header />
            <main className={Style.pages}>{ children }</main>
            <Footer />
        </div>
    );
};

export default Layout;
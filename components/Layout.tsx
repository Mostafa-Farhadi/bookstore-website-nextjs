import Header from './Header';
import Footer from './Footer';
import Style from '../styles/components/layout.module.scss';

/*
This is layout Component. It enable app to hold header and footer when pages changed.
*/
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
import Link from "next/link";
import Style from '../styles/components/footer.module.scss';

const Footer = () => {
    return ( 
        <footer className={Style.footer}>
            <Link href="https://nextjs.org/">
                <img src="/image/icon/nextjs.png" alt="nextjs"/>
            </Link>
        </footer>
    );
};

export default Footer;
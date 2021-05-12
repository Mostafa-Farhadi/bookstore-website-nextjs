import Link from "next/link";
import Style from '../styles/components/footer.module.scss';

/*
This is footer for all pages that shows an image.
*/
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
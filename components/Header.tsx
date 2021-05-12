import Link from 'next/link';
import Style from '../styles/components/header.module.scss';

/*
This is header for all page that consists of Four link to change pages.
*/
const Header = () => {
    return ( 
        <header className={Style.header}>
            <Link href="/">
                <a><img src="/image/icon/home.png" alt="home"/><span>Home</span></a>
            </Link>
            <Link href="/genre">
                <a><img src="/image/icon/genre.png" alt="genre"/><span>Genre</span></a>
            </Link>
            <Link href="/author">
                <a><img src="/image/icon/author.png" alt="author"/><span>Author</span></a>
            </Link>
            <Link href="/nationality">
                <a><img src="/image/icon/nationality.png" alt="nationality"/><span>Nationality</span></a>
            </Link>
        </header>
    );
};

export default Header;
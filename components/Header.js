import Link from 'next/link'

const Header = () => {
    return ( 
        <header id="header">
            <Link href="/"><a>Home</a></Link>
            <Link href="/genre"><a>Genre</a></Link>
            <Link href="/author"><a>Author</a></Link>
            <Link href="/nationality"><a>Nationality</a></Link>
        </header>
    );
}

export default Header;
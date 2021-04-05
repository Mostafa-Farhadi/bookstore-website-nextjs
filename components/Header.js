import Link from 'next/link'

const Header = () => {
    return ( 
        <header id="header">
            <Link href="/"><a>Home</a></Link>
        </header>
    );
}

export default Header;
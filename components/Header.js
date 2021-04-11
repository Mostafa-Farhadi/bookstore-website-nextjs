import Link from 'next/link'

const Header = () => {
    return ( 
        <header id="header">
            <Link href="/"><a>Home</a></Link>
            <input type="search" name="search" id="search" placeholder="Search your favorite book"/>
        </header>
    );
}

export default Header;
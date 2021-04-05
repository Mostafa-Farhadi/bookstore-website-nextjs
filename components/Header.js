import Link from 'next/link'

const Header = () => {
    return ( 
        <header id="header">
            <Link href="/"><a>Home</a></Link>
            <input type="search" name="search" id="search" placeholder="Search your favorite book"/>
            <Link href="/cart"><a>Cart</a></Link>
        </header>
    );
}

export default Header;
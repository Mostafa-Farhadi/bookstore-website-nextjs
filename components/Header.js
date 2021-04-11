import Link from 'next/link'

const Header = () => {
    return ( 
        <header id="header">
            <Link href="/"><a>Home</a></Link>
            <input type="search" name="search" id="search" placeholder="Search your favourite book"/>
        </header>
    );
}

export default Header;
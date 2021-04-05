import Link from 'next/link'

const Sidenav = () => {
    return ( 
        <nav id="sidenav">
            <Link href="/"><a>Home</a></Link>
            <Link href="/genre"><a>Genre</a></Link>
            <Link href="/writer"><a>Writer</a></Link>
            <Link href="/country"><a>Country</a></Link>
            <Link href="language"><a>Language</a></Link>
        </nav>
    );
}

export default Sidenav;
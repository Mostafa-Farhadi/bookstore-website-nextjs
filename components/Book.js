import Link from "next/link";

const Book = (props) => {
    const { src, name, author, price, link } = props
    const priceBefore = parseInt(price) + 5

    return ( 
        <Link href={`/books/${link}`}>
            <div className="book">
                <img src={src} alt="book"/>
                <p>{name}</p>
                <p>By {author}</p>
                <p><span>${priceBefore}</span> &nbsp; ${price}</p>
            </div>
        </Link>
    );
}

export default Book;
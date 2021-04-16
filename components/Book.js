import Link from "next/link";

const Book = (props) => {
    const { src, name, author, price, id } = props

    return ( 
        <Link href={`/books/${id}`}>
            <div className="book">
                <img src={src} alt="book"/>
                <p>{name}</p>
                <p>By {author}</p>
                <p>${price}</p>
            </div>
        </Link>
    );
}

export default Book;
import Link from "next/link";
import Style from '../styles/components/book.module.scss';
import { IBookComponent } from "../interfaces";

/*
This is Book component. It use information of books to show details of each book as a card.
It is added to pages.
*/
const Book = (props: IBookComponent) => {
    // Destructuring props
    const { src, name, author, price, id } = props;

    return (
        // Go to book details using next js Link component
        <Link href={`/books/${id}`}>
            {/* Create card for each book */}
            <div className={Style.book}>
                <img src={src} alt="book"/>
                <p>{name}</p>
                <p>By {author}</p>
                <p>${price}</p>
            </div>
        </Link>
    );
};

export default Book;
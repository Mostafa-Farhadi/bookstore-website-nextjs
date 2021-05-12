import { useState} from "react";
import Book from '../components/Book';
import Search from '../components/Search';
import Style from '../styles/pages/author.module.scss';
import { GetStaticProps } from 'next';
import { IEvent, IBooks, IProps } from "../interfaces";

/*
This is author page. It is consists of Saerch input component to search books, a book selection element to select
desired book according to its author, imported book cards component that will be showed when an author select.
*/
const Author = ({ books }: IProps) => {

    // State to hold array of books details with the same author when a author is selected from 'select element'.
    const [bookDetails, setBookDetails] = useState<IBooks[]>([]);

    // Hold each 'author' which is selected from 'select element' to show as value of 'select element'.
    const [selectedAuthor, setSelectedAuthor] = useState<string>("select");

    // An array to hold all authors to set as option in 'select-option' part.
    let authors: string[] = [];
    // A loops used to add all available authors in a single array (authors).
    for (let i = 0; i < books.length; i++) {
        // Array to hold authors of each book in every loop run.
        const author: string = books[i].author;
        // Check if there is a repetitive author to only add once.
        authors = authors.indexOf(author) > -1 ? authors : authors.concat(author);
    };

    // An handler to display all books with same author and set selected author as value of select element.
    const authorHandler = (event: IEvent): void => {
        // Set selected author to an constant
        const author: string = event.target.value;
        // Set selected author as value of select element.
        setSelectedAuthor(author);
        // Create an array to hold all books with same author.
        let booksArr: IBooks[] = [];
        for (let k = 0; k < books.length; k++) {
        // Build authors variable of every book each time loop runs.
            const authors: string = books[k].author;
            // Push books that have same author as selected author to 'booksArr'.
            authors.indexOf(author) > -1 ? booksArr.push(books[k]) : booksArr;
        };
        // Set 'booksArr' as state to 'bookDetails'
        setBookDetails(booksArr)
    };
    
    return ( 
        <section className={Style.author}>
            {/* Add Search input component */}
            <Search books={books} />
            {/* Create select-option to select author */}
            <select value={selectedAuthor} onChange={authorHandler}>
                <option value="select">SELECT AUTHOR</option>
                {authors.sort().map((author: any, index: any) => (
                    <option value={author} key={index}>
                        {author}
                    </option>
                ))}
            </select>
            {/* A div to hold books cards that have same author as selected author. */}
            <div className={Style.booksContainer}>
                {
                    bookDetails === null ? '' : bookDetails.map((book: any) => (
                        <Book key={book.id} 
                            src={`image/books/${book.name}.jpg`} 
                            name={book.name} 
                            author={book.author} 
                            price={book.price} 
                            id={book.id}
                        />
                    ))
                }
            </div>
        </section>
    );
}

// Fetch Books information from api and pass it as props.
export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch("http://localhost:3000/api/books")
    const books = await res.json()
    
    return {
        props: {
            books,
        },
    }
}

export default Author;
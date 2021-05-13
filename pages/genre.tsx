import { useState} from "react";
import Book from '../components/Book';
import Search from '../components/Search';
import Style from '../styles/pages/genre.module.scss';
import { GetStaticProps } from 'next';
import { IEvent, IBooks, IProps } from "../interfaces";

/*
This is genre page. It is consists of Saerch input component to search books, a book selection element to select
desired book according to its genre, imported book cards component that will be showed when an genre select.
*/
const Genre = ({ books }: IProps) => {

    // State to hold array of books details with the same genre when a genre is selected from 'select element'.
    const [bookDetails, setBookDetails] = useState<IBooks[]>([]);

    // Hold each 'genre' which is selected from 'select element' to show as value of 'select element'.
    const [selectedGenre, setSelectedGenre] = useState<string>("select");

    // An array to hold all genres to set as option in 'select-option' part.
    let totalGenres: string[] = [];
    // Add all available genres in a single array (totalGenres).
    books.forEach((element: IBooks) => {
        // Array to hold genres of each book for each element.
        const genresArr: string[] = element.genres;
        // Add genres of each book in a 'totalGenres' array. Repetitive genres are removed. 
        genresArr.forEach((element: string) => {
            // Check if there is a repetitive genre to only add once.
            totalGenres = totalGenres.indexOf(element) > -1 ? totalGenres : totalGenres.concat(element);
        });
    });

    // An handler to display all books with same genre and set selected genre as value of select element.
    const genreHandler = (event: IEvent): void => {
        // Set selected genre to an constant
        const genre: string = event.target.value;
        // Set selected genre as value of select element.
        setSelectedGenre(genre);
        // Create an array to hold all books with same genre.
        const booksArr: IBooks[] = [];
        books.forEach(element => {
            // Build genres array of every book for each element.
            const genresArr: string[] = element.genres;
            // Push books that have same genre as selected genre to 'booksArr'.
            genresArr.indexOf(genre) > -1 ? booksArr.push(element) : booksArr;
            
        });
        // Set 'booksArr' as state to 'bookDetails'
        setBookDetails(booksArr);
    };

    return (
        <section className={Style.genre}>
            {/* Add Search input component */}
            <Search books={books} />
            {/* Create select-option to select genre */}
            <select value={selectedGenre} onChange={genreHandler}>
                <option value="select">SELECT GENRE</option>
                {totalGenres.sort().map((genre: any, index: any) => (
                    <option value={genre} key={index}>{genre}</option>
                ))}
            </select>
            {/* A div to hold books cards that have same genre as selected genre. */}
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
};

// Fetch Books information from api and pass it as props.
export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch("http://localhost:3000/api/books");
    const books = await res.json();
    
    return {
        props: {
            books,
        },
    };
};

export default Genre;
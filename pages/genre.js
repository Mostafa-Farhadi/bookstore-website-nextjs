import { useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Book from '../components/Book';

const Genre = ({ books }) => {
    const [bookDetails, setBookDetails] = useState(null);
    const [value, setValue] = useState("select");

    let totalGenres = [];
    for (let i = 0; i < books.length; i++) {
        const genresArr = books[i].genres;
        for (let j = 0; j < genresArr.length; j++) {
            totalGenres = totalGenres.indexOf(genresArr[j]) > -1 ? totalGenres : totalGenres.concat(genresArr[j]);
        }
    }

    const genreHandler = (event) => {
        const genre = event.target.value;
        setValue(genre)
        let booksArr = [];
        for (let k = 0; k < books.length; k++) {
            const genresArr = books[k].genres;
            genresArr.indexOf(genre) > -1 ? booksArr.push(books[k]) : booksArr;
        }
        setBookDetails(booksArr);
    }

    return (
        <section id="genre">
            <select value={value} onChange={genreHandler}>
                <option value="select">SELECT GENRE</option>
                {totalGenres.sort().map(genre => (
                    <option value={genre} key={uuidv4()} onClick={genreHandler}>{genre}</option>
                ))}
            </select>
            <div className="books-container">
                {
                    bookDetails === null ? '' : bookDetails.map(book => (
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

export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/books")
    const books = await res.json()
    
    return {
        props: {
            books,
        },
    }
}

export default Genre;
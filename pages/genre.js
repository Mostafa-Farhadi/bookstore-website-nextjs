import { useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Book from '../components/Book';

const Genre = ({ books }) => {
    const [bookDetails, setBookDetails] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);

    let totalGenresArr = [];
    for (let i = 0; i < books.length; i++) {
        const genresArr = books[i].genres;
        for (let j = 0; j < genresArr.length; j++) {
            totalGenresArr = totalGenresArr.indexOf(genresArr[j]) > -1 ? totalGenresArr : totalGenresArr.concat(genresArr[j]);
        }
    }

    const genreHandler = (event) => {
        const genre = event.target.value;
        setSelectedGenre(genre)
        let booksArr = []
        for (let k = 0; k < books.length; k++) {
            const genresArr = books[k].genres;
            genresArr.indexOf(genre) > -1 ? booksArr.push(books[k]) : '';
        }
        setBookDetails(booksArr)
    }

    return (
        <section id="genre">
            <select name="genres" id="genres" size="8">
            {totalGenresArr.sort().map(genre => (
                <option value={genre} key={uuidv4()} onClick={genreHandler}>{genre}</option>
                ))}
            </select>
            {bookDetails === null ? '' : <p className="genre">{selectedGenre}</p>}
            <div className="books-container">
                {
                    bookDetails === null ? '' : bookDetails.map(book => (
                        <Book key={book.id} 
                            url={`image/books/${book.name}.jpg`} 
                            name={book.name} 
                            author={book.author} 
                            price={book.price} 
                            link={book.id}
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
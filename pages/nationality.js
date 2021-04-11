import { useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Book from '../components/Book';

const Nationality = ({ books }) => {
    const [bookDetails, setBookDetails] = useState(null);
    const [selectedNationality, setSelectedNationality] = useState(null);

    let nationalities = [];
    for (let i = 0; i < (books.length - 1); i++) {
        const nationality = books[i].nationality;
            nationalities = nationalities.indexOf(nationality) > -1 ? nationalities : nationalities.concat(nationality);
    }

    const nationalityHandler = (event) => {
        const nationality = event.target.value;
        setSelectedNationality(nationality);
        let booksArr = []
        for (let k = 0; k < books.length; k++) {
            const nationalityArr = books[k].nationality;
            nationalityArr.indexOf(nationality) > -1 ? booksArr.push(books[k]) : '';
        }
        setBookDetails(booksArr)
    }
    
    return ( 
        <section id="nationality">
            <select name="nationality" id="nationality" size="5">
            {nationalities.sort().map(nationality => (
                <option value={nationality} key={uuidv4()} onClick={nationalityHandler}>
                    {nationality}
                </option>
                ))}
            </select>
            {bookDetails === null ? '' : <p className="nationality">{selectedNationality}</p>}
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

export default Nationality;
import { useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Book from '../components/Book';

const Author = ({ books }) => {
    const [bookDetails, setBookDetails] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    let authors = [];
    for (let i = 0; i < (books.length - 1); i++) {
        const author = books[i].author;
            authors = authors.indexOf(author) > -1 ? authors : authors.concat(author);
    }

    const authorHandler = (event) => {
        const author = event.target.value;
        setSelectedAuthor(author);
        let booksArr = []
        for (let k = 0; k < books.length; k++) {
            const authorArr = books[k].author;
            authorArr.indexOf(author) > -1 ? booksArr.push(books[k]) : '';
        }
        setBookDetails(booksArr)
    }
    
    return ( 
        <section id="author">
            <select name="author" id="authors" size="8">
            {authors.sort().map(author => (
                <option value={author} key={uuidv4()} onClick={authorHandler}>
                    {author}
                </option>
                ))}
            </select>
            {bookDetails === null ? '' : <p className="author">{selectedAuthor}</p>}
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

export default Author;
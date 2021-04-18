import { useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Book from '../components/Book';
import SearchBox from '../components/SearchBox';

const Author = ({ books }) => {
    const [bookDetails, setBookDetails] = useState(null);
    const [value, setValue] = useState("select");

    let authors = [];
    for (let i = 0; i < books.length; i++) {
        const author = books[i].author;
            authors = authors.indexOf(author) > -1 ? authors : authors.concat(author);
    }

    const authorHandler = (event) => {
        const author = event.target.value;
        setValue(author)
        let booksArr = []
        for (let k = 0; k < books.length; k++) {
            const authorsArr = books[k].author;
            authorsArr.indexOf(author) > -1 ? booksArr.push(books[k]) : booksArr;
        }
        setBookDetails(booksArr)
    }
    
    return ( 
        <section id="author">
            <SearchBox books={books} />
            <select value={value} onChange={authorHandler}>
                <option value="select">SELECT AUTHOR</option>
                {authors.sort().map(author => (
                    <option value={author} key={uuidv4()}>
                        {author}
                    </option>
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

export default Author;
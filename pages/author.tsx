import { useState} from "react";
import Book from '../components/Book';
import Search from '../components/Search';
import Style from '../styles/pages/author.module.scss';
import { GetStaticProps } from 'next';
import { IEvent, IBooks, IProps } from "../interfaces";

const Author = ({ books }: IProps) => {
    const [bookDetails, setBookDetails] = useState<IBooks[]>([]);
    const [value, setValue] = useState<string>("select");

    let authors: string[] = [];
    for (let i = 0; i < books.length; i++) {
        const author: string = books[i].author;
        authors = authors.indexOf(author) > -1 ? authors : authors.concat(author);
    };

    const authorHandler = (event: IEvent): void => {
        const author: string = event.target.value;
        setValue(author);
        let booksArr: IBooks[] = [];
        for (let k = 0; k < books.length; k++) {
            const authors: string = books[k].author;
            authors.indexOf(author) > -1 ? booksArr.push(books[k]) : booksArr;
        };
        setBookDetails(booksArr)
    };
    
    return ( 
        <section className={Style.author}>
            <Search books={books} />
            <select value={value} onChange={authorHandler}>
                <option value="select">SELECT AUTHOR</option>
                {authors.sort().map((author: any, index: any) => (
                    <option value={author} key={index}>
                        {author}
                    </option>
                ))}
            </select>
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
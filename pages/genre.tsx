import { useState} from "react";
import Book from '../components/Book';
import Search from '../components/Search';
import Style from '../styles/pages/genre.module.scss';
import { GetStaticProps } from 'next';
import { IEvent, IBooks, IProps } from "../interfaces";

const Genre = ({ books }: IProps) => {
    const [bookDetails, setBookDetails] = useState<IBooks[]>([])
    const [value, setValue] = useState<string>("select");

    let totalGenres: string[] = [];
    for (let i = 0; i < books.length; i++) {
        const genresArr: string[] = books[i].genres;
        for (let j = 0; j < genresArr.length; j++) {
            totalGenres = totalGenres.indexOf(genresArr[j]) > -1 ? totalGenres : totalGenres.concat(genresArr[j]);
        };
    };

    const genreHandler = (event: IEvent): void => {
        const genre: string = event.target.value;
        setValue(genre);
        const booksArr: IBooks[] = [];
        for (let k = 0; k < books.length; k++) {
            const genresArr: string[] = books[k].genres;
            genresArr.indexOf(genre) > -1 ? booksArr.push(books[k]) : booksArr;
        };
        setBookDetails(booksArr);
    };

    return (
        <section className={Style.genre}>
            <Search books={books} />
            <select value={value} onChange={genreHandler}>
                <option value="select">SELECT GENRE</option>
                {totalGenres.sort().map((genre: any, index: any) => (
                    <option value={genre} key={index}>{genre}</option>
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
};

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
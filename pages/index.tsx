import { useState, useEffect} from "react";
import Book from '../components/Book';
import Search from '../components/Search';
import Style from '../styles/pages/index.module.scss';
import { GetStaticProps } from 'next';
import { IProps } from "../interfaces";

const Home = ({ books }: IProps) => {
    const [randumNumbers, setRandumNumbers] = useState<number[]>([]);

    useEffect(() => {
        let randomArr: number[] = [];
        do {
            const randomNum: number = Math.floor(Math.random() * books.length);
            randomArr = randomArr.indexOf(randomNum) > -1 ? randomArr : randomArr.concat(randomNum);
        } while (randomArr.length < 5)
        setRandumNumbers(randomArr);
    }, [books]);

    return (
        <section className={Style.index}>
            <Search books={books} />
            <div className={Style.cover}>
                <img src="/image/cover/cover.png" alt="cover"/>
            </div>
            <h1>BOOK OFFERS</h1>
            <div className={Style.books}>
            {
                randumNumbers.map(randNum => (
                <Book 
                    key={randNum} 
                    src={`/image/books/${books[randNum].name}.jpg`} 
                    name={books[randNum].name} 
                    author={books[randNum].author} 
                    price={books[randNum].price} 
                    id={books[randNum].id} />
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
            books
        }
    };
};

export default Home;
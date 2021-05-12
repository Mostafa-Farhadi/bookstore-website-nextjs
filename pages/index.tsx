import { useState, useEffect} from "react";
import Book from '../components/Book';
import Search from '../components/Search';
import Style from '../styles/pages/index.module.scss';
import { GetStaticProps } from 'next';
import { IProps } from "../interfaces";

/*
This is home page. It consists of an search input component to search books, an cover image, and 5 imported book cards component.
This component accepts information of all books as props which are fetched from api endpoint using SSG data fetching.
Using an array of five random 'id' and books props, information of five random books are passed as props to 'Book component'.
*/
const Home = ({ books }: IProps) => {

    // State to hold 5 random books's id to use in offering some books randomly.
    const [randumBooksId, setRandumBooksId] = useState<number[]>([]);

    // 'useEffect' to set an array with 5 random numbers as state to 'randumBooksId' when the page is rendered or books props will be changed.
    useEffect(() => {
        // Random array to hold random numbers.
        let randomArr: number[] = [];
        // Create a loop to add random numbers to 'randomArr' array. The loops run while length of 'randomArr' array reach to 5.
        do {
            // Build random number each time loop runs.
            const randomNum: number = Math.floor(Math.random() * books.length);
            // Add random number (randomNum) to random array (randomArr) if it is not in the random array (randomArr).
            randomArr = randomArr.indexOf(randomNum) > -1 ? randomArr : randomArr.concat(randomNum);
        } while (randomArr.length < 5)
        // Set 'randomArr' as state to 'randumBooksId'
        setRandumBooksId(randomArr);
    // The component updates only books changed.
    }, [books]);

    return (
        <section className={Style.index}>
            {/* Add Search input component */}
            <Search books={books} />
            {/* Use an image as cover ro show in home page */}
            <div className={Style.cover}>
                <img src="/image/cover/cover.png" alt="cover"/>
            </div>
            {/* Book offering section of website */}
            <h1>BOOK OFFERS</h1>
            <div className={Style.books}>
                {/* Create 5 cards to hold details of each book. */}
                {
                    randumBooksId.map(randNum => (
                    <Book
                        // Pass six props to Book component
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

// Fetch Books information from api and pass it as props.
export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch("http://localhost:3000/api/books");
    const books = await response.json();

    return {
        props: {
            books
        }
    };
};

export default Home;
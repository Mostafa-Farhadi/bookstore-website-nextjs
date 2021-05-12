import Book from '../components/Book';
import Search from '../components/Search';
import Style from '../styles/pages/nationality.module.scss'
import { GetStaticProps } from 'next';
import { IBooks, IProps } from "../interfaces";

/*
This is nationality page. It classify books according to their author nationality.
It is consists of Saerch input component to search books, and some section to group all books with same author nationality.
*/
const Nationality = ({ books }: IProps) => {
    // An array to hold all possible nationality
    let nationalities: string[] = [];
    // A loops used to add all nationality in a single array (nationalities).
    for (let i = 0; i < books.length; i++) {
        // Array to hold nationality of each book in every loop run.
        const nationality: string = books[i].nationality;
        // Check if there is a repetitive nationality to only add once.
        nationalities = nationalities.indexOf(nationality) > -1 ? nationalities : nationalities.concat(nationality);
    };

    // An function to classify books according to their author nationality.
    const nation = (country: string): IBooks[] => {
        // An array to hold books with same nationality
        let booksArr: IBooks[] = [];
        for (let k = 0; k < books.length; k++) {
            // Build nationalities array variable of every book each time loop runs.
            const nationalitiesArr: string = books[k].nationality;
            // Push books that have same nationality 'booksArr'.
            nationalitiesArr.indexOf(country) > -1 ? booksArr.push(books[k]) : '';
        };
        // return booksArr for each country argument
        return booksArr;
    };

    return ( 
        <section className={Style.nationality}>
            {/* Add Search input component */}
            <Search books={books} />
            {/* Display all classified books according to their author nationality. */}
            {
                nationalities.map((nationality: string, index: number) => (
                    <div key={index}>
                        <div className={Style.booksHeader}>
                            <h1>{nationality.toUpperCase()}</h1>
                        </div>
                        <div className={Style.books}>
                            {
                                nation(nationality).map(nation => (
                                    <Book key={nation.id} 
                                        src={`image/books/${nation.name}.jpg`} 
                                        name={nation.name} 
                                        author={nation.author} 
                                        price={nation.price} 
                                        id={nation.id}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
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
        }
    };
};

export default Nationality;
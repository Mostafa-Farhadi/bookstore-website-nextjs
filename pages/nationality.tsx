import Book from '../components/Book';
import Search from '../components/Search';
import Style from '../styles/pages/nationality.module.scss'
import { GetStaticProps } from 'next';
import { IBooks, IProps } from "../interfaces";

const Nationality = ({ books }: IProps) => {
    let nationalities: string[] = [];
    for (let i = 0; i < books.length; i++) {
        const nationality: string = books[i].nationality;
        nationalities = nationalities.indexOf(nationality) > -1 ? nationalities : nationalities.concat(nationality);
    };

    const nation = (country: string): IBooks[] => {
        let booksArr: IBooks[] = [];
        for (let k = 0; k < books.length; k++) {
            const nationalitiesArr: string = books[k].nationality;
            nationalitiesArr.indexOf(country) > -1 ? booksArr.push(books[k]) : '';
        };
        return booksArr;
    };

    return ( 
        <section className={Style.nationality}>
            <Search books={books} />
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
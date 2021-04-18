import { v4 as uuidv4 } from 'uuid';
import Book from '../components/Book';
import SearchBox from '../components/SearchBox';

const Nationality = ({ books }) => {

    let nationalities = [];
    for (let i = 0; i < books.length; i++) {
        const nationality = books[i].nationality;
            nationalities = nationalities.indexOf(nationality) > -1 ? nationalities : nationalities.concat(nationality);
    }

    const nation = country => {
        let booksArr = []
        for (let k = 0; k < books.length; k++) {
            const nationalitiesArr = books[k].nationality;
            nationalitiesArr.indexOf(country) > -1 ? booksArr.push(books[k]) : '';
        }
        return booksArr
    }

    return ( 
        <section id="nationality">
            <SearchBox books={books} />
            {
                nationalities.map(nationality => (
                    <div key={uuidv4()}>
                        <div className="books-header">
                            <h1>{nationality.toUpperCase()}</h1>
                        </div>
                        <div className="books">
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
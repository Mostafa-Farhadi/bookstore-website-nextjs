import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";

const SearchBox = ({ books }) => {
    const [suggests, setSuggests] = useState([]);

    let booksName = [];
    for (let i = 0; i < books.length; i++) {
        booksName.push(books[i].name);
    }

    const suggestHandler = event => {
        const name = event.target.value.toLowerCase();
        if (name !== "") {
            let suggestionsArr = [];
            for (let i = 0; i < booksName.length; i++) {
            booksName[i].toLowerCase().indexOf(name) > -1 ? suggestionsArr.push([booksName[i], i]) : suggestionsArr;
            }
            setSuggests(suggestionsArr);
        } else {
            setSuggests([])
        }
    }

    return ( 
        <section className="search-box">
            <input 
                type="search" 
                name="search" 
                id="search" 
                placeholder="Search your favourite book..."
                onChange={event => suggestHandler(event)}
            />
            <div>
                {suggests.map(suggest => (
                    <Link href={`/books/${suggest[1] + 1}`} key={uuidv4()}>
                        <a>{suggest[0]}</a>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default SearchBox;
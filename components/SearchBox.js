import { useState } from "react";
import Link from "next/link";

const SearchBox = ({ books }) => {
    const [suggests, setSuggests] = useState([]);
    const [enteredText, setEnteredText] = useState("")

    let booksName = [];
    for (let i = 0; i < books.length; i++) {
        booksName.push(books[i].name);
    }

    const suggestHandler = event => {
        const name = event.target.value;
        setEnteredText(name);
        const nameLowerCase = event.target.value.toLowerCase();
        if (nameLowerCase !== "") {
            let suggestionsArr = [];
            for (let i = 0; i < booksName.length; i++) {
                if (booksName[i].toLowerCase().indexOf(nameLowerCase) > -1) {
                    suggestionsArr.push([booksName[i].replace(booksName[i].substr(0, nameLowerCase.length), ""), i]);
                } else {
                    suggestionsArr;
                }
            }
            setSuggests(suggestionsArr);
        } else {
            setSuggests([]);
        }
    }

    return ( 
        <section className="search-box">
            <form autoComplete="off">
                <input 
                    type="search" 
                    name="search" 
                    id="search" 
                    placeholder="Search your favourite book..."
                    onChange={event => suggestHandler(event)}
                />
            </form>
            <div>
                {suggests.map((suggest, index) => (
                    <Link href={`/books/${suggest[1] + 1}`} key={index}>
                        <a><span>{enteredText}</span>{suggest[0]}</a>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default SearchBox;
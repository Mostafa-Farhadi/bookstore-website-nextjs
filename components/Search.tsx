import { useState } from "react";
import Link from "next/link";
import Style from '../styles/components/search.module.scss';
import { IEvent, IProps, IBooks } from "../interfaces";

/*
This is Search component. It is added to each page to enable user search books according to book name.
*/
const Search = ({ books }: IProps) => {

    // State to hold books and their ids according to entered text.
    const [suggests, setSuggests] = useState<[string, number][]>([]);

    // Hold entered text
    const [enteredText, setEnteredText] = useState<string>("");

    // An array to hold name of all books that are fetched from api and passed as props to Search book.
    const booksName: string[] = [];
    // Push all books name to 'booksName' array according to their index 
    books.forEach((element: IBooks) => {
        booksName.push(element.name);
    });

    // A handler to set entered text as state to 'enteredText' and books and their ids according to entered text as state to 'suggests'.
    const suggestHandler = (event: IEvent): void => {
        // A variable to hold entered text and turn all words to lowercase.
        const text: string = event.target.value.toLowerCase();
        // Use if else condition to to set entered text as state to 'enteredText' and books and their ids according to entered text as state to 'suggests'.
        if (text !== "") {
            // An array to hold books and their ids according to entered text.
            const suggestionsArr: [string, number][] = [];
            booksName.forEach((element: string, index: number) => {
                // Evaluate if books name are similar to entered text. 
                if (element.slice(0, text.length).toLowerCase() === text) {
                    // If books have similar words, their names and ids push to 'suggestionsArr' array.
                    suggestionsArr.push([element.replace(element.substr(0, text.length), ""), index]);
                    // After removing similar words, the removed words are added to enteredText to show in the seuggestions. (They display bold).
                    setEnteredText(element.slice(0, text.length));
                } else {
                    // If there is no word similarity, the array doesn't change.
                    suggestionsArr;
                }
            });
            // All books with word similar to entered text add as state to 'suggests'.
            setSuggests(suggestionsArr);
        } else {
            setSuggests([]);
        };
    };

    return ( 
        <section className={Style.search}>
            {/* A form to hold input element */}
            <form autoComplete="off">
                <input 
                    type="search"
                    placeholder="Search your favourite book..."
                    onChange={event => suggestHandler(event)}
                />
            </form>
            {/* A div to display book suggested. */}
            <div>
                {suggests.map((suggest, index) => (
                    <Link href={`/books/${suggest[1] + 1}`} key={index}>
                        <a><span>{enteredText}</span>{suggest[0]}</a>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Search;
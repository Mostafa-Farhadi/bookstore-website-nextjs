import { useState } from "react";
import Link from "next/link";
import Style from '../styles/components/search.module.scss';
import { IEvent, IProps } from "../interfaces";

const Search = ({ books }: IProps) => {
    const [suggests, setSuggests] = useState<[string, number][]>([]);
    const [enteredText, setEnteredText] = useState<string>("");

    const booksName: string[] = [];
    for (let i = 0; i < books.length; i++) {
        booksName.push(books[i].name);
    };

    const suggestHandler = (event: IEvent): void => {
        const text: string = event.target.value.toLowerCase();
        if (text !== "") {
            const suggestionsArr: [string, number][] = [];
            for (let i = 0; i < booksName.length; i++) {
                if (booksName[i].slice(0, text.length).toLowerCase() === text) {
                    suggestionsArr.push([booksName[i].replace(booksName[i].substr(0, text.length), ""), i]);
                    setEnteredText(booksName[i].slice(0, text.length));
                } else {
                    suggestionsArr;
                }
            }
            setSuggests(suggestionsArr);
        } else {
            setSuggests([]);
        };
    };

    return ( 
        <section className={Style.search}>
            <form autoComplete="off">
                <input 
                    type="search"
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
};

export default Search;
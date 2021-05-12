import Style from '../../styles/pages/details.module.scss';
import { GetStaticProps, GetStaticPaths } from 'next';
import { IProp } from "../../interfaces";

/*
This is dynamic pages that use id of each book to display each book details to enable user buy book.
It is consists of details of eac book and a button to buy book.
*/
const Details = ({ book }: IProp) => {

    return (
        <div className={Style.details}>
            <img src={`/image/books/${book.name}.jpg`} alt="book"/>
            <p><span>Name:</span>{book.name}</p>
            <p><span>Author:</span>{book.author}</p>
            <p><span>Nationality:</span>{book.nationality}</p>
            <p><span>Price:</span>${book.price}</p>
            <p><span>About Book:</span>{book.about}</p>
            <p><span>Genres:</span></p>
            <ul>
                {
                    book.genres.map((genre: string, index: number) => (
                        <li key={index}>{genre}</li>
                    ))
                }
            </ul>
            <button>Buy</button>
        </div>
    );
};

// Define a list of paths to rendered as dynamic pages.
export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch("http://localhost:3000/api/books");
    const data= await res.json();

    const paths = data.map((book) => {
        return {
            params: { id: book.id.toString() }
        };
    });
    
    return {
        paths,
        fallback: false
    }; 
};

// Fetch Book with specific id information from api and pass it as props.
export const getStaticProps: GetStaticProps = async (context: any) => {
    const id = context.params.id;
    const res = await fetch("http://localhost:3000/api/books/" + id);
    const data = await res.json();

    return {
        props: {book: data}
    };
};

export default Details;
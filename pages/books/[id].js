const Details = ({ book }) => {
    return ( 
        <div className="details">
            <img src={`/image/books/${book.name}.jpg`} alt="book"/>
            <p><span>Name:</span> {book.name}</p>
            <p><span>Author:</span> {book.author}</p>
            <p><span>Nationality:</span> {book.nationality}</p>
            <p><span>Price:</span> ${book.price}</p>
            <button>Buy</button>
        </div>
    );
}

export const getStaticPaths = async () => {
    const res = await fetch("http://localhost:3000/api/books")
    const data = await res.json()

    const paths = data.map(book => {
        return {
            params: { id: book.id.toString() }
        }
    })
    
    return {
        paths,
        fallback: false
    }    
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch("http://localhost:3000/api/books/" + id)
    const data = await res.json();

    return {
        props: {book: data}
    }
}

export default Details;
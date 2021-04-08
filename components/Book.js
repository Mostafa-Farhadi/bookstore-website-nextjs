const Book = (props) => {
    const { url, name, author, price } = props
    const priceBefore = parseInt(price) + 5

    return ( 
        <div className="book">
            <img src={url} alt="book"/>
            <p>{name}</p>
            <p>By {author}</p>
            <p><span>${priceBefore}</span> &nbsp; ${price}</p>
        </div>
    );
}

export default Book;
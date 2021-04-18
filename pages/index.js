import { useState, useEffect} from "react";
import Book from '../components/Book';
import SearchBox from '../components/SearchBox';

const Home = ({ books }) => {
  const [randumNumbers, setRandumNumbers] = useState([])

  useEffect(() => {
      let randomArr = [];
      do {
        let randomNum = Math.floor(Math.random() * books.length);
        randomArr = randomArr.indexOf(randomNum) > -1 ? randomArr : randomArr.concat(randomNum);
      }while (randomArr.length < 5)
      setRandumNumbers(randomArr)
  }, [books])

  return (
      <section id="home">
        <SearchBox books={books} />
        <div className="cover">
            <img src="/image/cover/cover.png" alt="cover"/>
        </div>
        <h1>BOOK OFFERS</h1>
        <div className="books">
          {
            randumNumbers.map(randNum => (
              <Book 
                key={randNum} 
                src={`/image/books/${books[randNum].name}.jpg`} 
                name={books[randNum].name} 
                author={books[randNum].author} 
                price={books[randNum].price} 
                id={books[randNum].id} />
            ))
          }
        </div>
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

export default Home;
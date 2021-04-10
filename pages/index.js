import Book from '../components/Book';

const Home = ({ books }) => {

  function getRanArr(arrLength) {
    let randomArr = [];
    do {
        let randomNum = Math.floor(Math.random() * arrLength);
        randomArr = randomArr.indexOf(randomNum) > -1 ? randomArr : randomArr.concat(randomNum);
    }while (randomArr.length < 4)
    return randomArr;
  }
  const res = getRanArr(books.length);
  
  return ( 
      <section id="home">
          <img src="image/cover/cover.jpg" alt="cover"/>
          <h1>Best Seller</h1>
          <div className="books">
            <Book url={`image/books/${books[res[0]].name}.jpg`} name={books[res[0]].name} author={books[res[0]].author} price={books[res[0]].price} link={books[res[0]].id} />
            <Book url={`image/books/${books[res[1]].name}.jpg`} name={books[res[1]].name} author={books[res[1]].author} price={books[res[1]].price} link={books[res[1]].id} />
            <Book url={`image/books/${books[res[2]].name}.jpg`} name={books[res[2]].name} author={books[res[2]].author} price={books[res[2]].price} link={books[res[2]].id} />
            <Book url={`image/books/${books[res[3]].name}.jpg`} name={books[res[3]].name} author={books[res[3]].author} price={books[res[3]].price} link={books[res[3]].id} />
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
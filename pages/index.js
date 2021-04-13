import Book from '../components/Book';

const Home = ({ books }) => {

  function getRandArr(arrLength) {
    let randomArr = [];
    do {
        let randomNum = Math.floor(Math.random() * arrLength);
        randomArr = randomArr.indexOf(randomNum) > -1 ? randomArr : randomArr.concat(randomNum);
    }while (randomArr.length < 4)
    return randomArr;
  }
  const randNums = getRandArr(books.length);
  console.log(randNums);
  
  return ( 
      <section id="home">
          <img src="image/cover/cover.jpg" alt="cover"/>
          <h1>BOOK OFFERS</h1>
          <div className="books">
            {
              randNums.map(randNum => (
                <Book 
                  key={randNum} 
                  src={`/image/books/${books[randNum].name}.jpg`} 
                  name={books[randNum].name} 
                  author={books[randNum].author} 
                  price={books[randNum].price} 
                  link={books[randNum].id} />
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
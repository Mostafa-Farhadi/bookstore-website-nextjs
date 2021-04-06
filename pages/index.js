import Book from '../components/Book'

const Home = () => {
  return ( 
      <section id="home">
          <img src="image/cover/cover.jpg" alt="cover"/>
          <div className="books">
            <Book />
            <Book />
            <Book />
            <Book />
          </div>
      </section>
  );
}

export default Home;
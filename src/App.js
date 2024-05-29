import './App.css';
import { useState, useEffect } from 'react';
import searchIcon from './search.svg';
import MovieCard from './movieCard';

// a50eb0ad OMDB API KEY

const API_URL = "http://www.omdbapi.com/?apikey=a50eb0ad";


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("Spiderman");
  }, []);

  return (
    <div className='app'>
      <h1>Movie Stream</h1>

      <div className='search'>
        <input
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={searchIcon}
          alt='search'
          onClick={() => searchMovie(searchTerm)}
        />
      </div>

      {
        movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))} 
        </div>
        ) : (
        <div className='empty'>
          <h2>No movies found </h2>
        </div>
        )
      }

    </div>
  );
};

export default App;

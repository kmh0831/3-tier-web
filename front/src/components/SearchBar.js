import React, { useState } from 'react';
import { searchMovies } from '../api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title or actor"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="search-results">
        {movies.map((movie) => (
          <a key={movie.id} href={movie.netflixUrl} target="_blank" rel="noopener noreferrer">
            <img src={movie.posterUrl} alt={movie.title} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

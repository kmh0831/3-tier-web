import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    getMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <a key={movie.id} href={movie.netflixUrl} target="_blank" rel="noopener noreferrer">
          <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
        </a>
      ))}
    </div>
  );
};

export default MovieList;

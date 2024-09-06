import React, { useState, useEffect } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="movie-item">
          <img src={movie.poster} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;

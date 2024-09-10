import React, { useEffect, useState } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movies/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setFavorites(data))
      .catch((error) => console.error('찜한 목록을 가져오는 중 오류 발생:', error));
  }, []);

  return (
    <div>
      <h2>찜한 목록</h2>
      {favorites.map((movie) => (
        <div key={movie.id}>
          <img src={movie.poster_url} alt={movie.title} />
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Favorites;

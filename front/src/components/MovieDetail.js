import React, { useEffect, useState } from 'react';
import '../App.css';

function MovieDetail({ movie, onClose }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // 찜한 상태 확인
    fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_PORT}/api/movies/favorites`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then((favorites) => {
        if (Array.isArray(favorites)) {
          const isFavorited = favorites.some((fav) => fav.id === movie.id);
          setIsFavorite(isFavorited);
        }
      })
      .catch((error) => console.error('찜한 영화 데이터를 가져오는 중 오류 발생:', error));
  }, [movie.id]);

  const toggleFavorite = () => {
    const method = isFavorite ? 'DELETE' : 'POST';
    const url = isFavorite
      ? `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_PORT}/api/movies/favorite/${movie.id}`
      : `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_PORT}/api/movies/favorite`;

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => setIsFavorite(!isFavorite))
      .catch((error) => console.error('찜하기 처리 중 오류 발생:', error));
  };

  const handleWatchClick = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_PORT}/api/movies/${movie.id}/watch`);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-video">
          <iframe
            src={movie.trailer_url}
            width="100%"
            height="400px"
            allowFullScreen
          />
        </div>
        <div className="modal-info">
          <span className="movie-title">{movie.title}</span> {/* 영화 제목 */}
          <button className="fav-button" onClick={toggleFavorite}>
            {isFavorite ? '찜하기 취소' : '찜하기'}
          </button>
          <button className="watch-button" onClick={handleWatchClick}>영화 시청</button>
        </div>
        <div className="movie-description">{movie.description}</div>
      </div>
    </div>
  );
}

export default MovieDetail;

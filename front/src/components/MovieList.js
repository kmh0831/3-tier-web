import React, { useEffect, useState } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // 백엔드 API로부터 영화 목록 가져오기
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movies`)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('영화 데이터를 가져오는 중 오류 발생:', error));

    // 찜한 영화 목록 가져오기
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movies/favorites`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((data) => setFavoriteMovies(data))
      .catch((error) => console.error('찜한 영화 데이터를 가져오는 중 오류 발생:', error));
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  // 찜하기 추가/취소 처리
  const toggleFavorite = (movie) => {
    const isFavorited = favoriteMovies.some(fav => fav.id === movie.id);

    const method = isFavorited ? 'DELETE' : 'POST';
    const url = isFavorited
      ? `${process.env.REACT_APP_BACKEND_URL}/api/movies/favorite/${movie.id}`
      : `${process.env.REACT_APP_BACKEND_URL}/api/movies/favorite`;

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ movieId: movie.id }),
    })
      .then(() => {
        // 찜하기 상태 업데이트
        if (isFavorited) {
          setFavoriteMovies(prevFavorites =>
            prevFavorites.filter(fav => fav.id !== movie.id)
          );
        } else {
          setFavoriteMovies(prevFavorites => [...prevFavorites, movie]);
        }
      })
      .catch((error) => console.error('찜하기 처리 중 오류 발생:', error));
  };

  const handleWatchClick = (movie) => {
    // 영화 시청 페이지로 이동
    window.open(`${process.env.REACT_APP_BACKEND_URL}/api/movies/${movie.id}/watch`);
  };

  return (
    <section className="movie-section">
      <h2>오리지널 콘텐츠</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item" onClick={() => openModal(movie)}>
            <img src={movie.poster_url} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-video">
              <iframe
                src={selectedMovie.trailer_url}
                width="100%"
                height="315"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <div className="modal-info">
              <span className="movie-title">{selectedMovie.title}</span>
              <button
                className={`fav-button ${favoriteMovies.some((fav) => fav.id === selectedMovie.id) ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(selectedMovie)}
              >
                {favoriteMovies.some((fav) => fav.id === selectedMovie.id) ? '찜하기 취소' : '찜하기'}
              </button>
              <button className="watch-button" onClick={() => handleWatchClick(selectedMovie)}>
                영화 시청
              </button>
            </div>
            <div className="movie-description">{selectedMovie.description}</div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MovieList;

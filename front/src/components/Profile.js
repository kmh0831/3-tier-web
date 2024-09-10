import React, { useState, useEffect } from 'react';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // 사용자 정보 가져오기
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => setUserInfo(data))
    .catch(err => console.error("프로필 데이터를 가져오는 중 오류 발생:", err));

    // 찜한 영화 목록 가져오기
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movies/favorites`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(movies => setFavoriteMovies(movies))
    .catch(err => console.error("찜한 영화 데이터를 가져오는 중 오류 발생:", err));
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <button onClick={() => console.log("내 정보 클릭")}>내 정보</button>
        <button onClick={() => console.log("찜한 목록 클릭")}>찜한 목록</button>
        <button onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}>로그아웃</button>
      </div>

      <div className="profile-details">
        {userInfo && (
          <div>
            <h2>{userInfo.name}</h2>
            <p>{userInfo.email}</p>
          </div>
        )}

        <div id="favorites-grid">
          {favoriteMovies.map(movie => (
            <div key={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;

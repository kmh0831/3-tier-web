import React from 'react';
import './Profile.css';  // 분리된 CSS 파일 import
import { useNavigate } from 'react-router-dom';

function Profile({ onClose, setIsAuthenticated }) {
  const navigate = useNavigate();

  // 로그아웃 함수
  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');

    // 로그인 상태를 false로 업데이트
    setIsAuthenticated(false);

    // 모달 닫기
    onClose();

    // 로그인 페이지로 리다이렉트
    navigate('/login');
  };

  return (
    <div className="profile-modal">
      <div className="profile-modal-content">
        {/* 왼쪽 배너 */}
        <div className="profile-modal-banner">
          <div className="profile-banner-item">내 정보</div>
          <div className="profile-banner-item">찜한 목록</div>
          <div className="profile-banner-item" onClick={handleLogout}>로그아웃</div> {/* 로그아웃 버튼 클릭 시 handleLogout 호출 */}
        </div>

        {/* 오른쪽 프로필 정보 */}
        <div className="profile-info">
          <h2>프 로 필</h2>
          <p>항상 저희 ROCKET 사이트를 이용해주셔서 감사합니다.</p>
        </div>

        {/* 닫기 버튼 */}
        <span className="profile-close" onClick={onClose}>&times;</span>
      </div>
    </div>
  );
}

export default Profile;

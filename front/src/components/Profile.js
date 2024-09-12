import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // 리다이렉트 기능을 사용하기 위해 추가
import './Profile.css';  // Profile 관련 스타일을 import

function Profile({ onClose }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isInfoLoaded, setIsInfoLoaded] = useState(false);  // 정보 로딩 여부를 확인하는 상태 추가
  const navigate = useNavigate();  // useNavigate 훅으로 리다이렉트 처리

  const loadUserInfo = () => {
    const token = localStorage.getItem('token');  // JWT 토큰 가져오기
    if (token && !isInfoLoaded) {  // 사용자 정보가 아직 로딩되지 않았다면
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
          setIsInfoLoaded(true);  // 사용자 정보 로딩 완료
        })
        .catch((error) => {
          console.error('사용자 정보 가져오기 오류:', error);
        });
    }
  };

  const handleLogout = () => {
    // 로그아웃 시 토큰 삭제
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');

    // 모달을 닫고 강제 리다이렉트
    onClose();
    navigate('/login', { replace: true });  // 리다이렉트 후 히스토리에서 이전 페이지를 제거
  };

  return (
    <div className="profile-modal">
      <div className="profile-modal-content">
        {/* 왼쪽 배너 */}
        <div className="modal-banner">
          <div className="banner-item" onClick={loadUserInfo}>내 정보</div>
          <div className="banner-item">찜한 목록</div>
          <div className="banner-item" onClick={handleLogout}>로그아웃</div>
        </div>

        {/* 오른쪽 프로필 정보 */}
        <div className="profile-info">
          <h2>닉네임</h2>

          {/* 사용자 정보 블럭 4개 */}
          {isInfoLoaded && userInfo ? (
            <div className="user-info-grid">
              <div className="info-block">이메일: {userInfo.email}</div>
              <div className="info-block">이름: {userInfo.name}</div>
              {/* 추가적인 정보 블럭들 (예: 가입일, 상태) */}
              <div className="info-block">가입일: 2024-01-01</div>
              <div className="info-block">상태: 활성</div>
            </div>
          ) : (
            <p>내 정보를 확인하려면 "내 정보"를 클릭하세요.</p>
          )}

          {/* 감사 인사 */}
          <p>항상 저희 ROCKET 사이트를 이용해주셔서 감사합니다.</p>
        </div>

        {/* 닫기 버튼 */}
        <span className="profile-close" onClick={onClose}>&times;</span>
      </div>
    </div>
  );
}

export default Profile;

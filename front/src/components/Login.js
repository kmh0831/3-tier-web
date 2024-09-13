import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 스타일 불러오기

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // 오류 메시지 상태 추가
  const navigate = useNavigate();

  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_PORT}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const expirationTime = new Date().getTime() + 6 * 60 * 60 * 1000; // 6시간 만료 시간
        localStorage.setItem('token', token);
        localStorage.setItem('token_expiration', expirationTime);
        setIsAuthenticated(true);
        navigate('/');  // 메인 페이지로 이동
      } else {
        const errorData = await response.json();
        setError(errorData.error || '로그인에 실패했습니다.');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Login</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>} {/* 오류 메시지 표시 */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button> {/* 회원가입 버튼 */}
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작
    setError(null); // 에러 초기화
    setSuccess(false); // 성공 메시지 초기화

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_PORT}/api/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, phone }),
      });

      if (response.ok) {
        setSuccess(true);
        setLoading(false); // 로딩 종료
        setTimeout(() => navigate('/login'), 1000); // 1초 후 로그인 페이지로 이동
      } else {
        const errorData = await response.json();
        setLoading(false); // 로딩 종료
        setError(errorData.error || '회원가입 중 문제가 발생했습니다.');
      }
    } catch (error) {
      setLoading(false); // 로딩 종료
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <span className="close" onClick={() => navigate('/login')}>×</span> {/* X 버튼 클릭 시 로그인 페이지로 이동 */}
        <h2>Sign Up</h2>
        {loading && <div>회원가입 처리 중입니다...</div>} {/* 로딩 메시지 */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>회원가입이 성공적으로 완료되었습니다!</div>}
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

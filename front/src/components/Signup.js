import React, { useState } from 'react';
import { signup } from '../api';

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSignup = async () => {
    const result = await signup(userInfo);
    if (result) {
      alert('Signup successful!');
    } else {
      alert('Signup failed!');
    }
  };

  return (
    <div className="signup">
      <input
        type="text"
        name="username"
        value={userInfo.username}
        onChange={handleInputChange}
        placeholder="Username"
        className="signup-input"
      />
      <input
        type="password"
        name="password"
        value={userInfo.password}
        onChange={handleInputChange}
        placeholder="Password"
        className="signup-input"
      />
      <input
        type="email"
        name="email"
        value={userInfo.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="signup-input"
      />
      <button onClick={handleSignup} className="signup-button">Sign Up</button>
    </div>
  );
};

export default Signup;

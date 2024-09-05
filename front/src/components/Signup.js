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
      />
      <input
        type="password"
        name="password"
        value={userInfo.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <input
        type="email"
        name="email"
        value={userInfo.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;

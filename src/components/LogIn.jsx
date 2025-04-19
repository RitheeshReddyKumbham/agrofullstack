import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleLogIn = () => {
    if (!email || !password) {
      setErr('Please enter valid credentials');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem(email));
    if (!storedUser) {
      setErr('User not found');
      return;
    }

    if (storedUser.password !== password) {
      setErr('Incorrect password');
      return;
    }
    localStorage.setItem('loggedInUser', email);
    if (onLogin) onLogin();
    navigate('/home');
  };

  return (
    <div>
      <h1>Log In</h1>
      <div className='inputs'>
        <p style={{ color: 'red' }}>{err}</p>
        <input
          className='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Enter your email'
        />
        <input
          className='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter your password'
        />
        <button onClick={handleLogIn}>Log In</button>
      </div>
    </div>
  );
}

export default LogIn;

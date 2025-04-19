import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!email || !password) {
      setErr('Please enter valid credentials');
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem(email));
    if (existingUser) {
      setErr('User already exists');
      navigate('/login');
    } else {
      localStorage.setItem(email, JSON.stringify({ email, password }));
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;

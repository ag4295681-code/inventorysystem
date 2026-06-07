import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setMessage('Registered! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage('Registration failed!');
      }
    } catch (err) {
      setMessage('Server error!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>S I M S</h1>
        <p>Smart Inventory Management System</p>
      </div>
      <div className="login-right">
        <h2>Create Account</h2>
        <p>Register to access your dashboard</p>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email address"
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
          {message && <p className="error">{message}</p>}
          <button type="submit">REGISTER</button>
        </form>
        <p>Already have an account? <a href="/">Login here</a></p>
      </div>
    </div>
  );
}

export default Register;
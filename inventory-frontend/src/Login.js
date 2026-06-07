import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if(data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        setError('Wrong email or password!');
      }
    })
    .catch(() => setError('Server se connect nahi ho pa raha!'));
  };

  return (
    <div style={{
      display:'flex', height:'100vh',
      fontFamily:'DM Sans, sans-serif'
    }}>
      {/* LEFT SIDE */}
      <div style={{
        flex:1.2, background:'linear-gradient(135deg, #0A1628, #1E3A5F)',
        display:'flex', flexDirection:'column',
        justifyContent:'center', alignItems:'center',
        color:'white', padding:'3rem'
      }}>
        <h1 style={{fontSize:'2.5rem', color:'#C9A96E', letterSpacing:'0.3em'}}>SIMS</h1>
        <p style={{color:'#8B9BB4', letterSpacing:'0.15em', marginTop:'0.5rem'}}>
          Smart Inventory Management System
        </p>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div style={{
        flex:0.9, background:'#060A10',
        display:'flex', alignItems:'center', justifyContent:'center'
      }}>
        <div style={{width:'100%', maxWidth:'380px', padding:'2rem'}}>
          <h2 style={{color:'#E8EDF5', fontFamily:'Playfair Display', marginBottom:'0.5rem'}}>
            Sign in to SIMS
          </h2>
          <p style={{color:'#8B9BB4', fontSize:'0.85rem', marginBottom:'2rem'}}>
            Access your inventory dashboard
          </p>

          <input
            type="email"
            placeholder="Email address"
            onChange={e => setEmail(e.target.value)}
            style={{
              width:'100%', padding:'0.85rem',
              background:'rgba(30,58,95,0.3)',
              border:'1px solid rgba(45,107,228,0.25)',
              borderRadius:'6px', color:'white',
              marginBottom:'1rem', fontSize:'0.9rem'
            }}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            style={{
              width:'100%', padding:'0.85rem',
              background:'rgba(30,58,95,0.3)',
              border:'1px solid rgba(45,107,228,0.25)',
              borderRadius:'6px', color:'white',
              marginBottom:'1.5rem', fontSize:'0.9rem'
            }}
          />

          {error && <p style={{color:'#ff6b6b', fontSize:'0.8rem', marginBottom:'1rem'}}>{error}</p>}

          <button
            onClick={handleLogin}
            style={{
              width:'100%', padding:'0.9rem',
              background:'linear-gradient(90deg, #1a4fa0, #2D6BE4)',
              border:'none', borderRadius:'6px',
              color:'white', fontSize:'0.85rem',
              letterSpacing:'0.2em', cursor:'pointer'
            }}
          >
            SIGN IN
          </button>

          <p style={{color:'#8B9BB4', textAlign:'center', marginTop:'1.5rem', fontSize:'0.75rem'}}>
            Don't have an account? <a href="/register" style={{color:'#4F8EF7'}}>Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
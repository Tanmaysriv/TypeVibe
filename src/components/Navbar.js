import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
  };
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/TypeVibe.svg" alt="TypeVibe logo" style={{ height: 32, marginRight: 8, verticalAlign: 'middle' }}/>
        <Link to="/" style={{ fontWeight: 700, fontSize: 20, letterSpacing: 2, color: '#fff', textDecoration: 'none' }}>TypeVibe</Link>
        <Link to="/history">History</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user ? <span>Logged in as {user.email}</span> : <Link to="/auth">Login</Link>}
        <button className="dark-toggle" onClick={toggleDarkMode} title="Toggle dark mode">🌙</button>
      </div>
    </nav>
  );
};

export default Navbar; 
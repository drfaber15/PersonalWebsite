import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`navbar ${darkMode ? 'navbar-dark' : 'navbar-light'}`}>
      {/* Left: Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Right: Theme toggle */}
      <div
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle theme"
      >
        {darkMode ? '☀️' : '🌙'}
      </div>

      {/* Slide-out menu */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Me</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎯</span>
          <span className="logo-text">EnvisionPaths</span>
        </Link>

        <button
          className="navbar-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/pricing" className="nav-link" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>

          {currentUser ? (
            <>
              <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/interview-practice" className="nav-link" onClick={() => setMenuOpen(false)}>
                Interview Practice
              </Link>
              <Link to="/career-paths" className="nav-link" onClick={() => setMenuOpen(false)}>
                Career Paths
              </Link>
              <Link to="/resume-review" className="nav-link" onClick={() => setMenuOpen(false)}>
                Resume Review
              </Link>
              <button className="btn btn-outline nav-link" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                Log In
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

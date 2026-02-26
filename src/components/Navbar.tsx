import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🎯</span> EnvisionPaths
                </Link>
                <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                    ☰
                </button>
                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}> 
                    {!user ? ( 
                        <> 
                            <li>
                                <Link to="/login" className="nav-link"> Login </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="nav-link btn btn-primary"> Sign Up </Link>
                            </li>
                        </>
                    ) : ( 
                        <> 
                            <li>
                                <Link to="/dashboard" className="nav-link"> Dashboard </Link>
                            </li>
                            <li>
                                <Link to="/interview-practice" className="nav-link"> Interview Practice </Link>
                            </li>
                            <li>
                                <Link to="/career-paths" className="nav-link"> Career Paths </Link>
                            </li>
                            <li>
                                <Link to="/resume-review" className="nav-link"> Resume Review </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="nav-link"> Pricing </Link>
                            </li>
                            <li>
                                <Link to="/settings" className="nav-link"> Settings </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="nav-link btn btn-danger"> Logout </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
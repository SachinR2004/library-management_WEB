import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Library App</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/library">Library</Link></li>
                    <li><Link to="/borrow">Borrow</Link></li>
                    <li><Link to="/return">Return</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
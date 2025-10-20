import React from 'react';
import './pages.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Library</h1>
            <p>Your gateway to a world of knowledge and adventure.</p>
            <div className="home-buttons">
                <a href="/login" className="btn">Login</a>
                <a href="/register" className="btn">Register</a>
                <a href="/library" className="btn">Explore Library</a>
            </div>
        </div>
    );
};

export default Home;
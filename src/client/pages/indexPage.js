import React from 'react';
import './pages.css';

const IndexPage = () => {
    return (
        <div className="index-page">
            <h1>Welcome to the Library</h1>
            <p>Your gateway to a world of knowledge and adventure.</p>
            <div className="index-buttons">
                <a href="/login" className="btn">Login</a>
                <a href="/register" className="btn">Register</a>
                <a href="/library" className="btn">Browse Library</a>
            </div>
        </div>
    );
};

export default IndexPage;
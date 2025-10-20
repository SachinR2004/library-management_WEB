import React from 'react';
import './components.css';

const BookCard = ({ book, onBorrow }) => {
    return (
        <div className="book-card">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>
            <p className="book-description">{book.description}</p>
            <button className="borrow-button" onClick={() => onBorrow(book.id)}>
                Borrow
            </button>
        </div>
    );
};

export default BookCard;
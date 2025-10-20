import React, { useState, useEffect } from 'react';
import { returnBook } from '../utils/api';
import './pages.css';

const ReturnPage = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch borrowed books from the API
        const fetchBorrowedBooks = async () => {
            // Assume we have a function to get borrowed books
            const books = await getBorrowedBooks();
            setBorrowedBooks(books);
        };

        fetchBorrowedBooks();
    }, []);

    const handleReturn = async () => {
        if (selectedBook) {
            const response = await returnBook(selectedBook.id);
            if (response.success) {
                setMessage('Book returned successfully!');
                setBorrowedBooks(borrowedBooks.filter(book => book.id !== selectedBook.id));
                setSelectedBook(null);
            } else {
                setMessage('Failed to return the book. Please try again.');
            }
        }
    };

    return (
        <div className="return-page">
            <h1>Return a Book</h1>
            {message && <p className="message">{message}</p>}
            <select onChange={(e) => setSelectedBook(JSON.parse(e.target.value))}>
                <option value="">Select a book to return</option>
                {borrowedBooks.map(book => (
                    <option key={book.id} value={JSON.stringify(book)}>
                        {book.title}
                    </option>
                ))}
            </select>
            <button onClick={handleReturn} disabled={!selectedBook}>
                Return Book
            </button>
        </div>
    );
};

export default ReturnPage;
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../utils/api';
import BookCard from '../components/BookCard';
import './pages.css';

const Library = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            const data = await fetchBooks();
            setBooks(data);
        };
        getBooks();
    }, []);

    return (
        <div className="library-container">
            <h1 className="library-title">Library</h1>
            <div className="book-list">
                {books.length > 0 ? (
                    books.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))
                ) : (
                    <p>No books available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default Library;
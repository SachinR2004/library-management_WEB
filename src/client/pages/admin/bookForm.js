import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './pages.css';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookData = { title, author, isbn, description };

        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            if (response.ok) {
                history.push('/admin/books');
            } else {
                console.error('Failed to add book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="book-form-container">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN:</label>
                    <input
                        type="text"
                        id="isbn"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Add Book</button>
            </form>
        </div>
    );
};

export default BookForm;
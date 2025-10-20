import React, { useEffect, useState } from 'react';
import { fetchBooks, deleteBook } from '../../utils/api';
import './pages.css';

const AdminBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            const data = await fetchBooks();
            setBooks(data);
        };
        getBooks();
    }, []);

    const handleDelete = async (id) => {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
    };

    return (
        <div className="admin-books">
            <h1>Admin Books Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                <button onClick={() => handleDelete(book.id)}>Delete</button>
                                <a href={`/admin/bookForm?id=${book.id}`}>Edit</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/admin/bookForm" className="add-book-button">Add New Book</a>
        </div>
    );
};

export default AdminBooks;
const API_BASE_URL = 'http://localhost:5000/api';

async function fetchBooks() {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
    return await response.json();
}

async function fetchBookById(bookId) {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch book');
    }
    return await response.json();
}

async function registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to register user');
    }
    return await response.json();
}

async function loginUser(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return await response.json();
}

async function borrowBook(bookId, userId) {
    const response = await fetch(`${API_BASE_URL}/borrow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId, userId }),
    });
    if (!response.ok) {
        throw new Error('Failed to borrow book');
    }
    return await response.json();
}

async function returnBook(borrowId) {
    const response = await fetch(`${API_BASE_URL}/return`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ borrowId }),
    });
    if (!response.ok) {
        throw new Error('Failed to return book');
    }
    return await response.json();
}

export {
    fetchBooks,
    fetchBookById,
    registerUser,
    loginUser,
    borrowBook,
    returnBook,
};
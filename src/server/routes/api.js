const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all books
router.get('/books', bookController.getAllBooks);

// Get a single book by ID
router.get('/books/:id', bookController.getBookById);

// Create a new book
router.post('/books', authMiddleware, bookController.createBook);

// Update a book by ID
router.put('/books/:id', authMiddleware, bookController.updateBook);

// Delete a book by ID
router.delete('/books/:id', authMiddleware, bookController.deleteBook);

// Get user profile
router.get('/profile', authMiddleware, bookController.getUserProfile);

// Borrow a book
router.post('/borrow/:id', authMiddleware, bookController.borrowBook);

// Return a book
router.post('/return/:id', authMiddleware, bookController.returnBook);

// Send borrow reminders
router.post('/reminders', authMiddleware, bookController.sendBorrowReminders);

module.exports = router;
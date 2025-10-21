

import express from 'express';
import Book from '../models/Book.js';
import User from '../models/User.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all books
router.get('/books', async (req, res) => {
    try {
        const { search, category, status } = req.query;
        let query = {};

        if (search) {
            query.$text = { $search: search };
        }
        if (category) {
            query.category = category;
        }
        if (status) {
            query.status = status;
        }

        const books = await Book.find(query).sort({ createdAt: -1 });
        res.json({ books });
    } catch (error) {
        console.error('Get books error:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
});

// Get single book
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ book });
    } catch (error) {
        console.error('Get book error:', error);
        res.status(500).json({ message: 'Error fetching book' });
    }
});

// Create book (Admin only)
router.post('/books', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: 'Book created successfully', book });
    } catch (error) {
        console.error('Create book error:', error);
        res.status(500).json({ message: 'Error creating book' });
    }
});

// Update book (Admin only)
router.put('/books/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully', book });
    } catch (error) {
        console.error('Update book error:', error);
        res.status(500).json({ message: 'Error updating book' });
    }
});

// Delete book (Admin only)
router.delete('/books/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Delete book error:', error);
        res.status(500).json({ message: 'Error deleting book' });
    }
});

// Borrow book
router.post('/borrow', authMiddleware, async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user.userId;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.availableCopies <= 0) {
            return res.status(400).json({ message: 'Book is not available' });
        }

        // Calculate due date (14 days from now)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);

        // Update user's borrowed books
        const user = await User.findById(userId);
        user.borrowedBooks.push({
            bookId: book._id,
            borrowedAt: new Date(),
            dueDate: dueDate,
        });

        // Decrease available copies
        book.availableCopies -= 1;

        await Promise.all([user.save(), book.save()]);

        res.json({ 
            message: 'Book borrowed successfully', 
            dueDate: dueDate 
        });
    } catch (error) {
        console.error('Borrow book error:', error);
        res.status(500).json({ message: 'Error borrowing book' });
    }
});

// Return book
router.post('/return', authMiddleware, async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user.userId;

        const user = await User.findById(userId);
        const borrowedBook = user.borrowedBooks.find(
            b => b.bookId.toString() === bookId && !b.returnedAt
        );

        if (!borrowedBook) {
            return res.status(400).json({ message: 'Book not borrowed' });
        }

        borrowedBook.returnedAt = new Date();

        const book = await Book.findById(bookId);
        book.availableCopies += 1;

        await Promise.all([user.save(), book.save()]);

        res.json({ message: 'Book returned successfully' });
    } catch (error) {
        console.error('Return book error:', error);
        res.status(500).json({ message: 'Error returning book' });
    }
});

// Get borrowed books for current user
router.get('/borrowed', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .populate('borrowedBooks.bookId');
        
        const activeBorrows = user.borrowedBooks.filter(b => !b.returnedAt);
        
        res.json({ borrowedBooks: activeBorrows });
    } catch (error) {
        console.error('Get borrowed books error:', error);
        res.status(500).json({ message: 'Error fetching borrowed books' });
    }
});

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select('-password')
            .populate('borrowedBooks.bookId');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { name, email },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
});

export default router;

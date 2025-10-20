const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    availableCopies: {
        type: Number,
        required: true,
        default: 1,
    },
    totalCopies: {
        type: Number,
        required: true,
        default: 1,
    },
    description: {
        type: String,
        required: false,
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
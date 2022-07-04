const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title_auth: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
    },
    comments: {
        type: String,
    }
})

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
const mongoose = require('mongoose');
const Book = require('./models/book');

mongoose.connect('mongodb://127.0.0.1:27017/booksDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("***MONGO CONNECTION ERROR***")
        console.log(err)
    })


const seedBooks = [
    {
        title_auth: 'test',
        id: 1,
        comments: 'Nice Book'
    },
    {
        title_auth: 'test2',
        id: 2,
        comments: 'Nice Ending'
    },
    {
        title_auth: 'test3',
        id: 3,
        comments: 'lol'
    },
]

Book.insertMany(seedBooks)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
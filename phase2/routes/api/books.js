const express = require('express');
const books = require('../../favourite_books');
const router = express.Router();

//get all books
router.get('/',(req,res)=>{
    res.json(books);
});

//get a book
router.get('/:id',(req,res)=>{
    let book_found = books.some(book => book.id === parseInt(req.params.id));
    if(book_found){
        res.json(books.filter(book => book.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({message: `No Books with id of ${req.params.id}`});
    }
});

module.export = router;
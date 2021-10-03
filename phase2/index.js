//npm run dev    

const { Router } = require('express');
const express = require('express');
const path = require('path');
const app = express();
var books = require('./favourite_books');
const Book = require('./models/book');//**// 
const mongoose = require('mongoose');

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/booksDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


//get all books
//TODO: get all books from the database
app.get('/api/FaveBooks', (req,res)=>{
    // res.json(books);
    Book.find({})
    .then(saved_books => {
        if(saved_books.isEmpty){
            res.status(404).json({msg : "No books found"});
        }else{
            res.status(200).json(saved_books)
        }
    })
    .catch( () =>{
        res.status(404);
    })
});

//get a book
//TODO: get a book from the database
app.get('/api/FaveBooks/:id',(req,res)=>{
    Book.findById(req.params.id)
    .then(book => {
        console.log("jjjjjjjjjj"+book);
        res.status(200).json(book);
    })
    .catch(()=>{
        res.status(400).json({message: `No Books with id of ${req.params.id}`});
    })

    // let book_found = books.some(book => book.id === parseInt(req.params.id));
    // if(book_found){
    //     res.json(books.filter(book => book.id === parseInt(req.params.id)));
    // }else{
    //     res.status(400).json({message: `No Books with id of ${req.params.id}`});
    // }
});

//add a book
//TODO: add a book to the database
app.post('/api/FaveBooks',(req,res)=>{
    console.log("Post request add book")
    const newBook = {
        title_auth: req.body.title_auth,
        id: req.body.id,
        comments : ""
    };
    //check if book already exists in savedBooks
    // const found = books.some(book => book.id === newBook.id);

    // if(found){
    //     return res.status(400).json({msg: "Book already saved"});
    // }

    // books.push(newBook);
    // res.json({
    //     msg: "Book added",
    //     books: books
    // });
    Book.find({id: { $eq: newBook.id }})
    .then(book => {
        if (book==""){
            Book.insertMany(newBook);
            res.status(200).json({
                msg: "Book added",
            });
        }else{
            res.status(400).json({
                msg: `Book with id of ${newBook.id} already exists`
            });
        }
    })
    .catch((err)=>{
       console.log("Error !!");
    })
});

//delete a book
//TODO: delete a book from the database
app.delete('/api/FaveBooks/:id', (req,res) =>{
    // console.log(`Delete request for book with id ${req.params.id}`)
    // const found = books.some(book => book.id === parseInt(req.params.id));

    // if(found){
    //     books = books.filter(book => book.id !== parseInt(req.params.id));
    //     res.json({ 
    //         msg:"Book deleted", 
    //         books: books
    //     });
    // }else{
    //     res.json({msg: 'Book not found to delete'});
    // }  
    Book.find({id: { $eq: req.params.id }})
    .then(book => {
        if (book==""){
            console.log("NOT FOUND TO DELETE");
            res.status(400).json({
                msg: `Book with id of ${newBook.id} doesn't exists to delete it`
            });
        }else{
            console.log("FOUND TO DELETE");
            Book.deleteOne({id: { $eq: req.params.id }})
            .then(()=>{
                res.status(200).json({
                    msg: "Book deleted",
                });
            })
            .catch(err=>{
                console.log(err);
            })
        }
    })
    .catch((err)=>{
       console.log("Error !!");
    })
})


//update a book
//TODO: update a book from the database
app.put('/api/FaveBooks/:id', (req,res) =>{
    // const found = books.some(book => book.id === parseInt(req.params.id));

    // if(found){
    //     const updatedBook = req.body;
    //     for(let i=0; i< books.length;i++){
    //         if(books[i].id === parseInt(req.params.id)){
    //             if(updatedBook.title_auth != null){
    //                 books[i].title_auth = updatedBook.title_auth;
    //             }
    //             books[i].comments = updatedBook.comments;
    //             break;
    //         }
    //     }

    //     res.json({
    //         msg: "Books list updated", 
    //         books: books
    //     });

    // }else{
    //     res.status(404).json( {msg: 'Book not exists'});
    // }
    Book.find({id: { $eq: req.params.id }})
    .then(book => {
        if (book==""){
            console.log("NOT FOUND TO UPDATE");
            res.status(400).json({
                msg: `Book with id of ${newBook.id} doesn't exists to update it`
            });
        }else{
            console.log("FOUND TO UPDATE");
            let title_author;
            let comment;

            if(req.body.title_auth != null){title_author = req.body.title_auth;}
            if(req.body.comments != "Add some comments for the Book."){comment = req.body.comments;}

            Book.updateOne({id: { $eq: req.params.id }},{title_auth:title_author,comments:comment})
            .then(()=>{
                res.status(200).json({
                    msg: "Book deleted",
                });
            })
            .catch(err=>{
                console.log(err);
            })
        }
    })
    .catch((err)=>{
       console.log("Error !!");
    })  
})

//set the static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(3000,() => console.log('listening at port 3000'));
//npm run dev    

const { Router } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const Book = require('./models/book');
const mongoose = require('mongoose');

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var cors = require('cors');
app.use(cors());

//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/booksDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("***MONGO CONNECTION ERROR***")
        console.log(err)
    })


//get all books
app.get('/api/FaveBooks', (req,res)=>{
    Book.find({})
    .then(saved_books => {
        res.status(200).json(saved_books)
    })
    .catch( () =>{
        res.status(404).json({
            msg:"Error from database (find all books)"
        });
    })
});

//add a book
app.post('/api/FaveBooks',(req,res)=>{
    console.log("Post request add book")
    const newBook = {
        title_auth: req.body.title_auth,
        id: req.body.id,
        comments : ""
    };
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
    .catch(()=>{
        res.status(404).json({
            msg:"Error from database (add a book)"
        });
    })
});

//delete a book
app.delete('/api/FaveBooks/:id', (req,res) =>{ 
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
            .catch(()=>{
                res.status(404).json({
                    msg:"Error from database (delete a book [1])"
                });
            })
        }
    })
    .catch(()=>{
        res.status(404).json({
            msg:"Error from database (delete a book [2])"
        });
    })
})


//update a book
app.put('/api/FaveBooks/:id', (req,res) =>{
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
                    msg: "Book updated",
                });
            })
            .catch(()=>{
                res.status(404).json({
                    msg:"Error from database (update a book [1])"
                });
            })
        }
    })
    .catch(()=>{
        res.status(404).json({
            msg:"Error from database (update a book [2])"
        });
    })  
})

//set the static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(3000,() => console.log('listening at port 3000'));
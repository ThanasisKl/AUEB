//npm run dev    

const { Router } = require('express');
const express = require('express');
const path = require('path');
const app = express();
var books = require('./favourite_books');

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var cors = require('cors');
app.use(cors());


//get all books
app.get('/api/FaveBooks',(req,res)=>{
    res.json(books);
});

//get a book
app.get('/api/FaveBooks/:id',(req,res)=>{
    let book_found = books.some(book => book.id === parseInt(req.params.id));
    if(book_found){
        res.json(books.filter(book => book.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({message: `No Books with id of ${req.params.id}`});
    }
});

//add a book
app.post('/api/FaveBooks',(req,res)=>{
    console.log("Post request add book")
    const newBook = {
        title_auth: req.body.title_auth,
        id: req.body.id,
        comments : ""
    };
    //check if book already exists in savedBooks
    const found = books.some(book => book.id === newBook.id);

    if(found){
        return res.status(400).json({msg: "Book already saved"});
    }

    books.push(newBook);
    res.json({
        msg: "Book added",
        books: books
    });
});

//delete a book
app.delete('/api/FaveBooks/:id', (req,res) =>{
    console.log(`Delete request for book with id ${req.params.id}`)
    const found = books.some(book => book.id === parseInt(req.params.id));

    if(found){
        books = books.filter(book => book.id !== parseInt(req.params.id));
        res.json({ 
            msg:"Book deleted", 
            books: books
        });
    }else{
        res.json({msg: 'Book not found to delete'});
    }  
})


//update a book
app.put('/api/FaveBooks/:id', (req,res) =>{
    const found = books.some(book => book.id === parseInt(req.params.id));

    if(found){
        const updatedBook = req.body;
        for(let i=0; i< books.length;i++){
            if(books[i].id === parseInt(req.params.id)){
                if(updatedBook.title_auth != null){
                    books[i].title_auth = updatedBook.title_auth;
                }
                books[i].comments = updatedBook.comments;
                break;
            }
        }

        res.json({
            msg: "Books list updated", 
            books: books
        });

    }else{
        res.status(404).json( {msg: 'Book not exists'});
    }  
})

//set the static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(3000,() => console.log('listening at port 3000'));
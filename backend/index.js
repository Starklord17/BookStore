import express from "express";
import {PORT, mongoDBurl} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome to the Book Store');
});

// Route for Save a new Book
app.post('/books', async (req, res) => {
  try {
    if ( 
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({message: 'All fields are required'});
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book); // 201: Created
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

// Route for Get all Books from database
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

// Route for Get a Book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

// Route for Update a Book
app.put('/books/:id', async (req, res) => {
  try {

    if ( 
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({message: 'Send all required fields: title, author, publishYear'});
    }

    const {id} = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({message: 'Book not found'});
    }
    return res.status(200).send({message: 'Book updated successfully'});

  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

// Route for Delete a Book
app.delete('/books/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({message: 'Book not found'});
    }
    return res.status(200).send({message: 'Book deleted successfully'});

  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

// console.log('mongoDBurl:', mongoDBurl);

mongoose
  .connect(mongoDBurl)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

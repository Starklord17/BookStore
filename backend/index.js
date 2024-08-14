import express from "express";
import {PORT, mongoDBurl} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome to the Book Store');
});

app.use('/books', booksRoute);

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

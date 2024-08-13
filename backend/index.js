import express from "express";
import {PORT, mongoDBurl} from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome to the Book Store');
});

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

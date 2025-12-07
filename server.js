const express = require ('express');
const mongoose = require ('mongoose');
const Book = require ('./models/bookModels');
const app = express ();
const port = 3000;

//Routes
app.use (express.json ());
app.get ('/', (req, res) => {
  res.send ('Hello From API');
});

//Book Routes //
app.post ('/book', async (req, res) => {
  try {
    const book = await Book.create (req.body);
    res.status (200).json (book);
  } catch (error) {
    console.log (error.message);
    res.status (500).json ({message: error.message});
  }
});

mongoose
  .connect (
    'mongodb+srv://root:Ramzi3650@devadictapi.fk56ax2.mongodb.net/library_management?appName=devadictapi'
  )
  .then (() => {
    app.listen (port, () => {
      console.log (`Example app is listning on port ${port}`);
    });

    console.log ('successful conection to MongoDB');
  })
  .catch (error => {
    console.log (error);
  });

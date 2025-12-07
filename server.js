const express = require ('express');
const mongoose = require ('mongoose');
const Book = require ('./models/bookModels');
const app = express ();
const port = 3000;

//Middle ware
app.use (express.json ());
app.use (express.urlencoded ({extended: false}));

app.get ('/', (req, res) => {
  res.send ('Hello From API');
});

//Book Routes //
//POST To the Database
app.post ('/books', async (req, res) => {
  try {
    const book = await Book.create (req.body);
    res.status (200).json (book);
  } catch (error) {
    console.log (error.message);
    res.status (500).json ({message: error.message});
  }
});

//GET Data From the Database
app.get ('/books', async (req, res) => {
  try {
    const books = await Book.find ({});
    res.status (200).json (books);
  } catch (error) {
    console.log (error.message);
    res.status (500).json ({message: error.message});
  }
});
//Get A single book from books
app.get ('/books/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findById (id);
    res.status (200).json (book);
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});

//UPDATE A Book
app.put ('/books/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findByIdAndUpdate (id, req.body);
    //cannot find any product in the library database
    if (!book) {
      return res.status (404).json ({
        message: `Cannot not find a book with that ID in the library ${id}`,
      });
    }
    const updatedbook = await Book.findByIdAndUpdate (id, req.body);
    res.status (200).json (updatedbook);
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});

//DELETE A Book
app.delete ('/books/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findByIdAndDelete (id);
    res.status (200).json (book);
  } catch (error) {
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

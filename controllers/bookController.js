const Book = require ('../models/bookModel');

// CREATE book
const createBook = async (req, res) => {
  try {
    const {title, author, isbn, totalCopies} = req.body;

    // Validate required fields
    if (!title || !author || !isbn || !totalCopies) {
      return res.status (400).json ({message: 'Missing required fields'});
    }

    const book = await Book.create ({
      ...req.body,
      availableCopies: totalCopies, // auto set
    });

    res.status (201).json (book);
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

// GET all books (with search + pagination)
const getBooks = async (req, res) => {
  try {
    const {search, page = 1, limit = 10} = req.query;

    // Build search query
    const query = search
      ? {
          $or: [
            {title: new RegExp (search, 'i')},
            {author: new RegExp (search, 'i')},
            {isbn: new RegExp (search, 'i')},
          ],
        }
      : {};

    const books = await Book.find (query)
      .skip ((page - 1) * limit)
      .limit (Number (limit));

    res.status (200).json (books);
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

// GET single book
const getBookById = async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findById (id);

    if (!book) return res.status (404).json ({message: 'Book not found'});

    res.status (200).json (book);
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

// UPDATE book
const updateBook = async (req, res) => {
  try {
    const {id} = req.params;
    const updatedBook = await Book.findByIdAndUpdate (id, req.body, {
      new: true,
    });

    if (!updatedBook)
      return res.status (404).json ({message: 'Book not found'});

    res.status (200).json (updatedBook);
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findByIdAndDelete (id);

    if (!book) return res.status (404).json ({message: 'Book not found'});

    res.status (200).json ({message: 'Book deleted', book});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};

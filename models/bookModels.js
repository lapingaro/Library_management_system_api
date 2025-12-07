const mongoose = require ('mongoose');
const bookSchema = mongoose.Schema (
  {
    title: String,
    author: String,
    isbn: {type: String, unique: true},
    totalCopies: Number,
    availableCopies: Number,
  },
  {timestamps: true}
);
const Book = mongoose.mongoose.model ('Book', bookSchema);
module.exports = Book;

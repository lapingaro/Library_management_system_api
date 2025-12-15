const express = require ('express');
const router = express.Router ();

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require ('../controllers/bookController');

const {protect} = require ('../middleware/authMiddleware');
const {authorize} = require ('../middleware/roleMiddleware');

// PUBLIC routes
router.get ('/', getBooks);
router.get ('/:id', getBookById);

// LIBRARIAN-only routes
router.post ('/', protect, authorize ('librarian'), createBook);
router.put ('/:id', protect, authorize ('librarian'), updateBook);
router.delete ('/:id', protect, authorize ('librarian'), deleteBook);

module.exports = router;

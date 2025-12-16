const Reservation = require ('../models/reservationModel');
const Book = require ('../models/bookModel');

// Reserve a book
const reserveBook = async (req, res) => {
  try {
    const {bookId} = req.body;
    const userId = req.user._id;

    const book = await Book.findById (bookId);
    if (!book) {
      return res.status (404).json ({message: 'Book not found'});
    }

    if (book.availableCopies > 0) {
      return res.status (400).json ({
        message: 'Book is available, no need to reserve',
      });
    }

    const existingReservation = await Reservation.findOne ({
      user: userId,
      book: bookId,
      status: 'active',
    });

    if (existingReservation) {
      return res.status (400).json ({
        message: 'You already reserved this book',
      });
    }

    const reservation = await Reservation.create ({
      user: userId,
      book: bookId,
    });

    res.status (201).json ({
      message: 'Book reserved successfully',
      reservation,
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

module.exports = {reserveBook};

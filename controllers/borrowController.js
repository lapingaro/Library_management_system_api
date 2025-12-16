const Book = require ('../models/bookModel');
const Borrower = require ('../models/borrowerModel');
const BorrowRecord = require ('../models/borrowRecordModel');
const Reservation = require ('../models/reservationModel');

const DAILY_FEE = 5;

const borrowBook = async (req, res) => {
  try {
    const {borrowerId, bookId} = req.body;

    // 1. Validate borrower
    const borrower = await Borrower.findById (borrowerId);
    if (!borrower)
      return res.status (404).json ({message: 'Borrower not found'});

    // 2. Validate book
    const book = await Book.findById (bookId);
    if (!book) return res.status (404).json ({message: 'Book not found'});

    // 3. Check availability
    if (book.availableCopies < 1) {
      return res.status (400).json ({message: 'No copies available'});
    }

    // 4. Reduce available copies
    book.availableCopies -= 1;
    await book.save ();

    // 5. Set due date (14 days from now)
    const dueDate = new Date ();
    dueDate.setDate (dueDate.getDate () + 14);

    // 6. Create borrow record
    const record = await BorrowRecord.create ({
      borrower: borrowerId,
      book: bookId,
      dueDate: dueDate,

      returned: false,
      returnDate: null,
    });

    res.status (201).json ({
      message: 'Book borrowed successfully',
      record,
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

const returnBook = async (req, res) => {
  try {
    const {recordId} = req.body;

    const record = await BorrowRecord.findById (recordId);
    if (!record) {
      return res.status (404).json ({message: 'Borrow record not found'});
    }

    if (record.returned) {
      return res.status (400).json ({message: 'Book already returned'});
    }

    const book = await Book.findById (record.book);
    if (!book) {
      return res.status (404).json ({message: 'Book not found'});
    }

    const today = new Date ();

    // Calculate overdue days
    let overdueDays = 0;
    if (today > record.dueDate) {
      overdueDays = Math.ceil (
        (today - record.dueDate) / (1000 * 60 * 60 * 24)
      );
    }

    // Calculate late fee
    const lateFee = overdueDays * DAILY_FEE;

    // Update record
    record.returned = true;
    record.returnDate = today;
    record.lateFee = lateFee;
    await record.save ();

    // Restore book copy
    book.availableCopies += 1;
    await book.save ();

    // ✅ FULFILL RESERVATION (FIFO)
    const reservation = await Reservation.findOne ({
      book: book._id,
      status: 'active',
    }).sort ({reservedAt: 1});

    if (reservation) {
      reservation.status = 'fulfilled';
      await reservation.save ();

      book.availableCopies -= 1;
      await book.save ();
    }

    res.status (200).json ({
      message: 'Book returned successfully',
      overdueDays,
      lateFee,
      reservationFulfilled: !!reservation,
      record,
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

const getBorrowHistory = async (req, res) => {
  try {
    const {page = 1, limit = 10, borrowerId, returned} = req.query;

    const query = {};

    // Optional filters
    if (borrowerId) query.borrower = borrowerId;
    if (returned !== undefined) query.returned = returned === 'true';

    const records = await BorrowRecord.find (query)
      .populate ('borrower', 'name email memberId')
      .populate ('book', 'title author isbn')
      .skip ((page - 1) * limit)
      .limit (Number (limit))
      .sort ({createdAt: -1});

    const total = await BorrowRecord.countDocuments (query);

    res.status (200).json ({
      total,
      page: Number (page),
      pages: Math.ceil (total / limit),
      records,
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

const getCurrentlyBorrowed = async (req, res) => {
  try {
    // Find active borrow records (not yet returned)
    const activeBorrows = await BorrowRecord.find ({returned: false})
      .populate ('borrower', 'name email memberId')
      .populate ('book', 'title author isbn');

    res.status (200).json ({
      message: 'Currently borrowed books fetched successfully',
      activeBorrows,
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getBorrowHistory,
  getCurrentlyBorrowed,
};

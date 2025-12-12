const Book = require ('../models/bookModel');
const Borrower = require ('../models/borrowerModel');
const BorrowRecord = require ('../models/borrowRecordModel');

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

    // 1. Find borrow record
    const record = await BorrowRecord.findById (recordId);
    if (!record) {
      return res.status (404).json ({message: 'Borrow record not found'});
    }

    // 2. Prevent double returns
    if (record.returned) {
      return res.status (400).json ({message: 'Book already returned'});
    }

    // 3. Find book
    const book = await Book.findById (record.book);
    if (!book) {
      return res.status (404).json ({message: 'Book not found'});
    }

    // 4. Mark record returned
    record.returned = true;
    record.returnDate = new Date ();
    await record.save ();

    // 5. Increase available copies
    book.availableCopies += 1;
    await book.save ();

    res.status (200).json ({
      message: 'Book returned successfully',
      record,
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

const getBorrowHistory = async (req, res) => {
  try {
    const history = await BorrowRecord.find ()
      .populate ('borrower', 'name email memberId') // return borrower fields
      .populate ('book', 'title author isbn'); // return book fields

    res.status (200).json ({
      message: 'Borrow history fetched successfully',
      history,
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

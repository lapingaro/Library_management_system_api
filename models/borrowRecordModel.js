const mongoose = require ('mongoose');

const borrowRecordSchema = new mongoose.Schema (
  {
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Borrower',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returned: {
      type: Boolean,
      default: false,
    },
    returnDate: {
      type: Date,
    },
    lateFee: {
      type: Number,
      default: 0,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model ('BorrowRecord', borrowRecordSchema);

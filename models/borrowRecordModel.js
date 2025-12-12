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
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returned: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model ('BorrowRecord', borrowRecordSchema);

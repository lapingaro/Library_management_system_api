const mongoose = require ('mongoose');

const borrowerSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    memberId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model ('Borrower', borrowerSchema);

const Borrower = require ('../models/borrowerModel');

// CREATE borrower
const createBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.create (req.body);
    res.status (201).json (borrower);
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

// GET all borrowers (with pagination & search later if you want)
const getBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.find ({});
    res.status (200).json (borrowers);
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

// GET single borrower
const getBorrowerById = async (req, res) => {
  try {
    const {id} = req.params;
    const borrower = await Borrower.findById (id);

    if (!borrower)
      return res.status (404).json ({message: 'Borrower not found'});

    res.status (200).json (borrower);
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

// UPDATE borrower
const updateBorrower = async (req, res) => {
  try {
    const {id} = req.params;

    const updatedBorrower = await Borrower.findByIdAndUpdate (id, req.body, {
      new: true,
    });

    if (!updatedBorrower)
      return res.status (404).json ({message: 'Borrower not found'});

    res.status (200).json (updatedBorrower);
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

// DELETE borrower
const deleteBorrower = async (req, res) => {
  try {
    const {id} = req.params;

    const borrower = await Borrower.findByIdAndDelete (id);

    if (!borrower)
      return res.status (404).json ({message: 'Borrower not found'});

    res.status (200).json ({message: 'Borrower deleted', borrower});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

module.exports = {
  createBorrower,
  getBorrowers,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
};

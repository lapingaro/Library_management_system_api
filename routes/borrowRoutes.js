const express = require ('express');
const router = express.Router ();
const {borrowBook} = require ('../controllers/borrowController');
const {returnBook} = require ('../controllers/borrowController');
const {getBorrowHistory} = require ('../controllers/borrowController');
const {getCurrentlyBorrowed} = require ('../controllers/borrowController');

router.post ('/', borrowBook);
router.post ('/return', returnBook);
router.get ('/history', getBorrowHistory);
router.get ('/currently-borrowed', getCurrentlyBorrowed);

module.exports = router;

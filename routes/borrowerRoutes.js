const express = require ('express');
const router = express.Router ();

const {
  createBorrower,
  getBorrowers,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
} = require ('../controllers/borrowerController');

router.post ('/', createBorrower);
router.get ('/', getBorrowers);
router.get ('/:id', getBorrowerById);
router.put ('/:id', updateBorrower);
router.delete ('/:id', deleteBorrower);

module.exports = router;

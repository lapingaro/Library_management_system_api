const express = require ('express');
const router = express.Router ();

const {reserveBook} = require ('../controllers/reservationController');
const {protect} = require ('../middleware/authMiddleware');
const {authorize} = require ('../middleware/roleMiddleware');

router.post ('/', protect, authorize ('user'), reserveBook);

module.exports = router;

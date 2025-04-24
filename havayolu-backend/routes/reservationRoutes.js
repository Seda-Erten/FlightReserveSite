const express = require('express');
const { createReservation, checkReservation } = require('../controllers/reservationController');
const router = express.Router();

router.post('/', createReservation);
router.post('/check', checkReservation);

module.exports = router;

const express = require('express');
const BookingController = require('../../controllers/booking-controller');
const BookedFlightController = require('../../controllers/bookedFlight-controller');

const bookingController = new BookingController();
const bookedFlightController = new BookedFlightController();
const router = express.Router();

router.post('/bookings', bookingController.create);

router.post('/bookedflight', bookedFlightController.create)

module.exports = router;
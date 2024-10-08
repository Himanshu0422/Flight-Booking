const express = require('express');
const BookingController = require('../../controllers/booking-controller');
const paymentController = require('../../controllers/payment-controller');
const { authorizeUser } = require('../../middleware/authMiddleware');
const BookedFlightController = require('../../controllers/bookedFlight-controller');

const bookingController = new BookingController();
const bookedFlightController = new BookedFlightController();
const router = express.Router();

router.post('/bookings', authorizeUser, bookingController.create);
router.post('/get-bookings', authorizeUser, bookingController.getBookings);
router.post('/getBookingById', authorizeUser, bookingController.getBookingById);
router.post('/getBookedFlight', authorizeUser, bookedFlightController.findByFlightId);
router.post('/create-payment-intent', authorizeUser, bookingController.createPaymentIntent);
router.post('/payment/razorpay', authorizeUser, paymentController.createOrder);
router.post('/payment/verify', paymentController.verifyPayment);
router.get('/ping', (req, res) => {
  console.log(`Ping received at ${new Date().toISOString()}`);
  res.json({ message: "Server is awake" });
});

module.exports = router;
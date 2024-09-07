const express = require('express');
const BookingController = require('../../controllers/booking-controller');
const paymentController = require('../../controllers/payment-controller');
const { authorizeUser } = require('../../middleware/authMiddleware');

const bookingController = new BookingController();
const router = express.Router();

router.post('/bookings', authorizeUser, bookingController.create);
router.post('/get-bookings', authorizeUser, bookingController.getBookings);
router.post('/getBookingById', authorizeUser, bookingController.getBookingById);
router.post('/create-payment-intent', authorizeUser, bookingController.createPaymentIntent);
router.post('/payment/razorpay', authorizeUser, paymentController.createOrder);
router.post('/payment/verify', authorizeUser, paymentController.verifyPayment);

module.exports = router;
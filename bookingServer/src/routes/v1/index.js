const express = require('express');
const BookingController = require('../../controllers/booking-controller');
const paymentController = require('../../controllers/payment-controller');

const bookingController = new BookingController();
const router = express.Router();

router.post('/bookings', bookingController.create);
router.post('/get-bookings', bookingController.getBookings);
router.post('/create-payment-intent', bookingController.createPaymentIntent);
router.post('/payment/razorpay', paymentController.createOrder);
router.post('/payment/verify', paymentController.verifyPayment);

module.exports = router;
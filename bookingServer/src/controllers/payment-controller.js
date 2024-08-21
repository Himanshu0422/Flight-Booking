
const BookingService = require("../services/booking-service");
const PaymentService = require("../services/payment-service");

const bookingService = new BookingService();

class PaymentController {

    async createOrder(req, res) {
        try {
            const { booking_id, amount, user_id } = req.body;

            const options = {
                amount: amount * 100,
                currency: 'INR',
                receipt: booking_id,
            };
            const order = await PaymentService.createOrder(options);
            await PaymentService.createPayment({
                payment_id: order.id,
                booking_id,
                user_id,
                amount,
                status: 'initiated',
            });

            res.json(order);
        } catch (error) {
            res.status(500).json({ error: 'Error creating Razorpay order' });
        }
    }

    async verifyPayment(req, res) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id } = req.body;
            const isValidSignature = await PaymentService.verifyPaymentSignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature });

            if (isValidSignature) {
                await PaymentService.updatePaymentStatus(razorpay_order_id, 'successful', req.body);
                await bookingService.updateBooking(booking_id, 'Booked');
                res.json({ status: 'Payment verified and booking successful' });
            } else {
                await PaymentService.updatePaymentStatus(razorpay_order_id, 'failed');
                await bookingService.updateBooking(booking_id, 'Rejected');
                res.status(400).json({ error: 'Payment verification failed' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error verifying payment' });
        }
    }
}

module.exports = new PaymentController();

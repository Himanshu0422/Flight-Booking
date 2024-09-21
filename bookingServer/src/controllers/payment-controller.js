
const BookingService = require("../services/booking-service");
const PaymentService = require("../services/payment-service");
const { deletePaginatedBookingCache } = require("../utils/deleteRedisCache");

const bookingService = new BookingService();

class PaymentController {

    async createOrder(req, res) {
        try {
            const { booking_id, amount, user_id } = req.body;

            const options = {
                amount: amount * 100,
                currency: 'INR',
                receipt: booking_id.toString(),
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
            const isValidSignature = await PaymentService.verifyPaymentSignature(req.headers['x-razorpay-signature'], req.body);
            if (!isValidSignature) {
                return res.status(400).json({ error: 'Invalid signature' });
            }
    
            const { order_id, id } = req.body.payload.payment.entity;
    
            try {
                await PaymentService.updatePaymentStatus(order_id, 'successful', req.body.payload.payment.entity);
    
                const paymentDetail = await PaymentService.findPaymentById(order_id);
    
                await deletePaginatedBookingCache(paymentDetail.user_id);
    
                await PaymentService.sendConfirmationEmail(paymentDetail.user_id);
    
                await bookingService.updateBooking(paymentDetail.booking_id, 'Booked');
    
                res.status(200).json({ status: 'Payment verified and booking successful' });
            } catch (error) {
                console.error('Error processing payment:', error);
                res.status(500).json({ error: 'Error processing payment' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error verifying payment' });
        }
    }
}

module.exports = new PaymentController();

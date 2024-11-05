const BookingService = require("../services/booking-service");
const PaymentService = require("../services/payment-service");
const { deletePaginatedBookingCache } = require("../utils/deleteRedisCache");
const { sequelize } = require('../models/index');

const bookingService = new BookingService();

class PaymentController {
    constructor() {}

    async createOrder(req, res) {
        const { booking_id, amount, user_id } = req.body;
    
        // Validate input data
        if (!booking_id || !amount || !user_id) {
            return res.status(400).json({ error: 'booking_id, amount, and user_id are required' });
        }
    
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'amount must be a positive number' });
        }
    
        const transaction = await sequelize.transaction(); // Start transaction
        try {
            const options = {
                amount: amount * 100, // Convert to paise
                currency: 'INR',
                receipt: booking_id.toString(),
            };
    
            // Create order via Razorpay
            const order = await PaymentService.createOrder(options);
    
            if (!order) {
                throw new Error('Failed to create order');
            }
    
            // Create payment entry in the database
            await PaymentService.createPayment(
                {
                    payment_id: order.id,
                    booking_id,
                    user_id,
                    amount,
                    status: 'initiated',
                },
                transaction
            );
    
            await transaction.commit(); // Commit transaction
            return res.status(201).json(order); // 201 for resource created
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
            await transaction.rollback(); // Rollback on error
            return res.status(500).json({ error: 'Error creating Razorpay order' });
        }
    } 

    async verifyPayment(req, res) {
        const signature = req.headers['x-razorpay-signature'];
        const body = req.body;

        console.log(body, signature);
    
        // Validate input data
        if (!signature || !body || !body.payload || !body.payload.payment || !body.payload.payment.entity) {
            return res.status(400).json({ error: 'Invalid payment verification request' });
        }
    
        const transaction = await sequelize.transaction(); // Start transaction
    
        try {
            const isValidSignature = await PaymentService.verifyPaymentSignature(signature, body);
            if (!isValidSignature) {
                return res.status(400).json({ error: 'Invalid signature' });
            }

            console.log(isValidSignature, 'isValidSignature');
    
            const { order_id, id } = body.payload.payment.entity;
    
            if (body.event === 'payment.failed') {
                await PaymentService.updatePaymentStatus(order_id, 'failed', body.payload.payment.entity, transaction);
                await transaction.commit(); // Commit transaction on failure status update
                return res.status(402).json({ error: 'Payment declined' });
            }
    
            // Update payment status to successful
            await PaymentService.updatePaymentStatus(order_id, 'successful', body.payload.payment.entity, transaction);
            const paymentDetail = await PaymentService.findPaymentById(order_id);
    
            if (!paymentDetail) {
                throw new Error('Payment not found');
            }
    
            await deletePaginatedBookingCache(paymentDetail.user_id);
            await PaymentService.sendConfirmationEmail(paymentDetail.user_id);
    
            // Update booking status to 'Booked'
            await bookingService.updateBooking(paymentDetail.booking_id, 'Booked', transaction);
    
            await transaction.commit(); // Commit transaction on success
    
            res.status(200).json({ status: 'Payment verified and booking successful' });
        } catch (error) {
            console.error('Error verifying payment:', error);
            await transaction.rollback(); // Rollback on error
            res.status(500).json({ error: 'Error verifying payment' });
        }
    }    
}

module.exports = PaymentController;

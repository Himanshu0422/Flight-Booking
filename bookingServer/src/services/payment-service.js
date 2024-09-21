const Razorpay = require('razorpay');
const axios = require('axios');
const crypto = require('crypto');
const PaymentRepository = require('../repository/payment-repository');
const { RAZORPAY_KEY, RAZORPAY_SECRET, AUTH_PATH } = require('../config/serverConfig');
const transporter = require("../config/transporter");

class PaymentService {
    constructor() {
        this.razorpay = new Razorpay({
            key_id: RAZORPAY_KEY,
            key_secret: RAZORPAY_SECRET,
        });
    }

    async createOrder(options) {
        try {
            const res = await this.razorpay.orders.create(options);
            return res;
        } catch (error) {
            console.error('Error in Razorpay order creation:', error);
        }
    }

    async createPayment(data) {
        return await PaymentRepository.createPayment(data);
    }

    async verifyPaymentSignature(signature, body) {
        const webhookSecret = '12345678';
        const hmac = crypto.createHmac('sha256', webhookSecret);
        hmac.update(JSON.stringify(body));
        const generatedSignature = hmac.digest('hex');
        return generatedSignature === signature;
    }

    async updatePaymentStatus(payment_id, status, payment_details) {
        return await PaymentRepository.updatePaymentStatus(payment_id, status, payment_details);
    }

    async findPaymentById(payment_id) {
        try {
            const payment = await PaymentRepository.findPaymentById(payment_id);
            return payment;
        } catch (error) {
            console.log('Something went wrong in payment service');
            throw { error };
        }
    }

    async sendConfirmationEmail(user_id) {
        try {
            const user = await axios.get(`${AUTH_PATH}/api/v1/user-details`, {
                params: { id: user_id }
            });

            const email = user.data.data.user.email;

            await transporter.sendMail({
                to: email,
                subject: 'Payment Successful',
                text: 'Your payment has been successfully processed and your booking is confirmed.'
            });
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            throw { error };
        }
    }
}

module.exports = new PaymentService();

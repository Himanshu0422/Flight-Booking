
const Razorpay = require('razorpay');
const PaymentRepository = require('../repository/payment-repository');
const { RAZORPAY_KEY, RAZORPAY_SECRET } = require('../config/serverConfig');

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

    async updatePaymentStatus(payment_id, status, payment_details) {
        return await PaymentRepository.updatePaymentStatus(payment_id, status, payment_details);
    }

    async verifyPaymentSignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', RAZORPAY_SECRET);
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        const generatedSignature = hmac.digest('hex');
        return generatedSignature === razorpay_signature;
    }
}

module.exports = new PaymentService();

const { Payments } = require('../models/index');
const { redis } = require('../config/redis');

class PaymentRepository {
    async createPayment(data) {
        return await Payments.create(data);
    }

    async updatePaymentStatus(payment_id, status, payment_details) {
        const updatedPayment = await Payments.update({ status, payment_details }, { where: { payment_id } });
        
        const cachedPayment = await redis.get(`payment_${payment_id}`);
        if (cachedPayment) {
            await redis.del(`payment_${payment_id}`);
        }

        return updatedPayment;
    }

    async findPaymentById(payment_id) {
        const cachedPayment = await redis.get(`payment_${payment_id}`);
        if (cachedPayment) {
            return JSON.parse(cachedPayment);
        }

        const payment = await Payments.findOne({ where: { payment_id } });

        if (payment) {
            await redis.set(`payment_${payment_id}`, JSON.stringify(payment), 'EX', 3600);
        }

        return payment;
    }
}

module.exports = new PaymentRepository();

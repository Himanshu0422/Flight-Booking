
const {Payments} = require('../models/index');

class PaymentRepository {
    async createPayment(data) {
        return await Payments.create(data);
    }

    async updatePaymentStatus(payment_id, status, payment_details) {
        return await Payments.update({ status, payment_details }, { where: { payment_id } });
    }

    async findPaymentById(payment_id) {
        return await Payments.findOne({ where: { payment_id } });
    }
}

module.exports = new PaymentRepository();

const { Booking, Passenger } = require('../models/index');
const { STRIPE_KEY } = require('../config/serverConfig');
const stripe = require('stripe')(STRIPE_KEY);

class BookingRepository {
    async create(bookingPayload, passengersData) {
        try {
            const booking = await Booking.create(bookingPayload);
            const updatedPassengersData = passengersData.map(passenger => ({
                ...passenger,
                bookingId: booking.id
            }));
            const passengers = await Passenger.bulkCreate(updatedPassengersData);
            return { booking, passengers };
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw { error }
        }
    }

    async update(bookingId, status) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (status) {
                booking.status = status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw { error }
        }
    }

    async createPaymentIntent(amount) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'INR',
                payment_method_types: ['card'],
            });
            return {
                clientSecret: paymentIntent.client_secret,
            };
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw { error }
        }
    }
}

module.exports = BookingRepository;
const { Booking, Passenger, Payments, BookedFlights } = require('../models/index');
const { STRIPE_KEY, FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const axios = require('axios');
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

    async getBookings(userId) {
        try {
            const bookings = await Booking.findAll({
                where: { userId },
                order: [['bookingDate', 'DESC']],
                include: [
                    { model: Passenger, as: 'passengers' },
                    { model: Payments, as: 'payments' },
                ]
            });

            const bookingDetails = await Promise.all(bookings.map(async (booking) => {
                const flightDetails = await axios.get(`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`);
                const returnFlightDetails = booking.returnFlightId
                    ? await axios.get(`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.returnFlightId}`)
                    : null;

                return {
                    ...booking.toJSON(),
                    flightDetails: flightDetails.data.data,
                    returnFlightDetails: returnFlightDetails ? returnFlightDetails.data.data : null,
                };
            }));

            return bookingDetails;
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw { error };
        }
    }

    async getBookingById(bookingId) {
        try {
            const booking = await Booking.findOne({
                where: { id: bookingId },
                include: [
                    { model: Passenger, as: 'passengers' },
                    { model: Payments, as: 'payments' },
                ]
            });
            const flightDetails = await axios.get(`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`);
            const returnFlightDetails = booking.returnFlightId
                    ? await axios.get(`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.returnFlightId}`)
                    : null;
            return {
                ...booking.toJSON(),
                flightDetails: flightDetails.data.data,
                returnFlightDetails: returnFlightDetails ? returnFlightDetails.data.data : null,
            }
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw { error };
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
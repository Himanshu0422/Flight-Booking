const { Booking, Passenger, Payments } = require('../models/index');
const { STRIPE_KEY, FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const axios = require('axios');
const stripe = require('stripe')(STRIPE_KEY);
const { redis } = require('../config/redis');

class BookingRepository {
    async create(bookingPayload, passengersData) {
        try {
            const booking = await Booking.create(bookingPayload);
            const updatedPassengersData = passengersData.map(passenger => ({
                ...passenger,
                bookingId: booking.id
            }));
            const passengers = await Passenger.bulkCreate(updatedPassengersData);
            
            await redis.del(`bookings:user:${bookingPayload.userId}`);

            return { booking, passengers };
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw { error };
        }
    }

    async update(bookingId, status) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (status) {
                booking.status = status;
            }
            await booking.save();

            await redis.del(`booking:${bookingId}`);
            await redis.del(`bookings:user:${booking.userId}`);

            return booking;
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw { error };
        }
    }

    async getBookings(userId, page) {
        try {
            const cacheKey = `bookings:user:${userId}:page:${page}`;
            const cachedBookings = await redis.get(cacheKey);

            if (cachedBookings) {
                return JSON.parse(cachedBookings);
            }

            const pageSize = 3;
            const offset = (page - 1) * pageSize;

            const { count, rows: bookings } = await Booking.findAndCountAll({
                where: { userId },
                order: [['bookingDate', 'DESC']],
                offset,
                limit: pageSize,
            });

            const bookingDetails = await Promise.all(bookings.map(async (booking) => {
                const flightDetails = await this.getFlightDetails(booking.flightId);
                const returnFlightDetails = booking.returnFlightId
                    ? await this.getFlightDetails(booking.returnFlightId)
                    : null;

                return {
                    ...booking.toJSON(),
                    flightDetails,
                    returnFlightDetails,
                };
            }));

            const totalPages = Math.ceil(count / pageSize);
            const result = {
                bookingDetails,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalBookings: count,
                },
            };

            await redis.set(cacheKey, JSON.stringify(result), 'EX', 3600);

            return result;
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw { error };
        }
    }

    async getBookingById(bookingId) {
        try {
            const cacheKey = `booking:${bookingId}`;
            const cachedBooking = await redis.get(cacheKey);

            if (cachedBooking) {
                return JSON.parse(cachedBooking);
            }

            const booking = await Booking.findOne({
                where: { id: bookingId },
                include: [
                    { model: Passenger, as: 'passengers' },
                    { model: Payments, as: 'payments' },
                ],
            });

            const flightDetails = await this.getFlightDetails(booking.flightId);
            const returnFlightDetails = booking.returnFlightId
                ? await this.getFlightDetails(booking.returnFlightId)
                : null;

            const result = {
                ...booking.toJSON(),
                flightDetails,
                returnFlightDetails,
            };

            await redis.set(cacheKey, JSON.stringify(result), 'EX', 3600);

            return result;
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw { error };
        }
    }

    async createPaymentIntent(amount) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'INR',
                payment_method_types: ['card'],
            });
            return {
                clientSecret: paymentIntent.client_secret,
            };
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw { error };
        }
    }

    async getFlightDetails(flightId) {
        try {
            const cacheKey = `flight:${flightId}`;
            const cachedFlight = await redis.get(cacheKey);

            if (cachedFlight) {
                return JSON.parse(cachedFlight);
            }

            const flightDetails = await axios.get(`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`);

            await redis.set(cacheKey, JSON.stringify(flightDetails.data.data), 'EX', 3600);

            return flightDetails.data.data;
        } catch (error) {
            console.log('Failed to fetch flight details', error);
            throw { error };
        }
    }
}

module.exports = BookingRepository;

const { BookedFlights } = require('../models/index');
const { redis } = require('../config/redis');

class BookedFlightRepository {
    async create(data) {
        try {
            const bookedFlight = await BookedFlights.create(data);
            await redis.del(`bookedFlights:flightId:${data.flightId}:date:${data.bookingDate}`);
            return bookedFlight;
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw error;
        }
    }

    async findByFlightId(flightId, bookingDate) {
        try {
            const cacheKey = `bookedFlights:flightId:${flightId}:date:${bookingDate}`;
            const cachedBookedFlight = await redis.get(cacheKey);

            if (cachedBookedFlight) {
                return JSON.parse(cachedBookedFlight);
            }

            const bookedFlight = await BookedFlights.findOne({ where: { flightId, bookingDate } });

            if (bookedFlight) {
                await redis.set(cacheKey, JSON.stringify(bookedFlight), 'EX', 3600);
            }

            return bookedFlight;
        } catch (error) {
            console.log('Failed to find booking in repository layer', error);
            throw error;
        }
    }

    async update(bookingId, data) {
        try {
            const bookedFlight = await BookedFlights.findByPk(bookingId);
            if (data.status) {
                bookedFlight.noOfSeats = data.seats;
            }
            await bookedFlight.save();

            const cacheKey = `bookedFlights:flightId:${bookedFlight.flightId}:date:${bookedFlight.bookingDate}`;
            await redis.del(cacheKey);

            return bookedFlight;
        } catch (error) {
            console.log('Failed in repository layer', error);
            throw error;
        }
    }
}

module.exports = BookedFlightRepository;

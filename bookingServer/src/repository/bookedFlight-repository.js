const { BookedFlights } = require('../models/index');

class BookedFlightRepository {
    async create(data) {
        try {
            const bookedFlight = await BookedFlights.create(data);
            return bookedFlight;
        } catch (error) {
            console.log('Failed in repository layer', error);
        }
    }

    async findByFlightId(flightId) {
        try {
            const bookedFlight = await BookedFlights.findOne({ where: { flightId } });
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
            return bookedFlight;
        } catch (error) {
            console.log('Failed in repository layer', error);
        }
    }
}

module.exports = BookedFlightRepository;
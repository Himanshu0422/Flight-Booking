const axios = require('axios');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const BookedFlightRepository = require('../repository/bookedFlight-repository');

class BookedFlightService {
    constructor() {
        this.bookedFlightRepository = new BookedFlightRepository();
    }

    async createBookedFlight(data, transaction) {
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
    
            // Validate seat availability
            if (data.noOfSeats > flightData.totalSeats) {
                throw new Error('Insufficient seats in the flight');
            }
    
            let bookedFlight = await this.bookedFlightRepository.findByFlightId(flightId, data.bookingDate);
            if (bookedFlight) {
                const noOfSeats = data.noOfSeats;
                if (flightData.totalSeats - bookedFlight.noOfSeats < noOfSeats) {
                    throw new Error('Insufficient seats in the flight');
                }
                bookedFlight.noOfSeats += noOfSeats;
                bookedFlight = await bookedFlight.save({ transaction }); // Pass transaction here
            } else {
                bookedFlight = await this.bookedFlightRepository.create(data, transaction); // Pass transaction here
            }
    
            return bookedFlight;
        } catch (error) {
            console.log(error);
            if (error.name === 'RepositoryError' || error.name === 'ValidationError') {
                throw error;
            }
            throw new Error(error.message);
        }
    }    

    async findByFlightId(flightId, bookingDate) {
        try {
            const bookedFlight = await this.bookedFlightRepository.findByFlightId(flightId, bookingDate);
            return bookedFlight;
        } catch (error) {
            console.log('Something went wrong in the service layer.');
            throw error;
        }
    }
}

module.exports = BookedFlightService;
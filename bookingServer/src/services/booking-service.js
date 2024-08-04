const axios = require('axios');

const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const BookingRepository = require('../repository/booking-repository');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats) {
                console.log('Something went wrong in the booking process', 'Insufficient seats in the flight');
            }
            const totalCost = priceOfTheFlight * data.bookedSeats;
            const bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            return booking
        } catch (error) { 
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
        }
    }
}

module.exports = BookingService;
const axios = require('axios');

const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const BookingRepository = require('../repository/booking-repository');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(bookingData, passengersData) {
        try {
            const flightId = bookingData.flightId;
            
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            
            let priceOfTheFlight = flightData.price;
            const totalCost = priceOfTheFlight * bookingData.bookedSeats;

            const bookingPayload = {...bookingData, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload, passengersData);
            return booking
        } catch (error) { 
            console.log('Failed in service layer', error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
        }
    }

    async updateBooking(bookingId, status){
        try {
            const updateFlight = await this.bookingRepository.update(bookingId, status);
        } catch (error) {
            console.log('Failed in service layer', error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
        }
    }

    async createPaymentIntent(amount) {
        try {
            const res = this.bookingRepository.createPaymentIntent(amount);
            return res;
        } catch (error) {
            console.log('Failed in service layer', error);
            throw error
        }
    }
}

module.exports = BookingService;
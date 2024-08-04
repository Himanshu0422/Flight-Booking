const { StatusCodes } = require('http-status-codes');
const BookedFlightService = require('../services/bookedFlight-service');

const bookedFlightService = new BookedFlightService();

class BookedFlightController {

    constructor() {
    }

    async create (data) {
        try {
            const response = await bookedFlightService.createBookedFlight(data);
            return response
        } catch (error) {
            console.log(error, 'In BookedFlight Controller');
        }
    }
}

module.exports = BookedFlightController
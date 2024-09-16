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

    async findByFlightId (req, res) {
        try {
            const {flightId, bookingDate} = req.body
            const bookedFlight = await bookedFlightService.findByFlightId(flightId, bookingDate);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully fetched bookedFlight',
                success: true,
                err: {},
                data: bookedFlight
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch bookedFlight.',
                success: false,
                err: error.message,
                data: {}
            });
        }
    }
}

module.exports = BookedFlightController
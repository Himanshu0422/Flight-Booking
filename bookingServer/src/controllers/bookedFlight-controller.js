const { StatusCodes } = require('http-status-codes');
const BookedFlightService = require('../services/bookedFlight-service');

const bookedFlightService = new BookedFlightService();

class BookedFlightController {

    constructor() {
    }

    async create (req, res) {
        try {
            const response = await bookedFlightService.createBookedFlight(req.body);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}

module.exports = BookedFlightController
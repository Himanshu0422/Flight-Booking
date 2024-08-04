const { StatusCodes } = require('http-status-codes');
const BookingService = require('../services/booking-service');
const BookedFlightController = require('./bookedFlight-controller');

const bookingService = new BookingService();
const bookedFlightController = new BookedFlightController();

class BookingController {

    constructor() {
    }

    async create(req, res) {
        try {
            let bookingData = {
                flightId: req.body.bookingData.flightId,
                noOfSeats: req.body.bookingData.bookedSeats
            };
            const bookedFlight = await bookedFlightController.create(bookingData);
            console.log(bookedFlight, 'bookedFlight');

            bookingData = {
                ...req.body.bookingData,
                bookedFlightId: bookedFlight.id
            };
            const passengersData = req.body.passengersData;
            console.log(bookingData, passengersData);

            const response = await bookingService.createBooking(bookingData, passengersData);

            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            });
        } catch (error) {
            console.log('Error:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to complete booking',
                success: false,
                err: error.message,
                data: {}
            });
        }
    }
}

module.exports = BookingController;

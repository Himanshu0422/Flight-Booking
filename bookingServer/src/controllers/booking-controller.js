const { StatusCodes } = require('http-status-codes');
const BookingService = require('../services/booking-service');
const BookedFlightController = require('./bookedFlight-controller');
const { scheduleBookingStatusUpdate } = require('../services/scheduler');
const {Booking} = require('../models/index');

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

            bookingData = {
                ...req.body.bookingData,
                bookedFlightId: bookedFlight.id
            };
            const passengersData = req.body.passengersData;

            const response = await bookingService.createBooking(bookingData, passengersData);
            scheduleBookingStatusUpdate(response.booking.id, response.booking.createdAt)

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

    async createPaymentIntent(req, res) {
        try {
            const {amount} = req.body;
            const response = await bookingService.createPaymentIntent(amount);
            return res.status(200).json({
                clientSecret: response.clientSecret
            })
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

module.exports = BookingController;

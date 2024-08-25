const { StatusCodes } = require('http-status-codes');
const BookingService = require('../services/booking-service');
const BookedFlightController = require('./bookedFlight-controller');
const { scheduleBookingStatusUpdate } = require('../services/scheduler');
const {Booking} = require('../models/index');
const transporter = require('../config/transporter');

const bookingService = new BookingService();
const bookedFlightController = new BookedFlightController();

class BookingController {

    constructor() {
    }

    async create(req, res) {
        try {
            let bookingData = {
                flightId: req.body.bookingData.flightId,
                noOfSeats: req.body.bookingData.bookedSeats,
                bookingDate: req.body.bookingData.bookingDate
            };
            let returnBookingData = {
                flightId: req.body.bookingData.returnFlightId,
                noOfSeats: req.body.bookingData.bookedSeats,
                bookingDate: req.body.bookingData.returnBookingDate
            };
            const email = req.body.email;
            const bookedFlight = await bookedFlightController.create(bookingData);
            let returnBookedFlight
            if(returnBookingData.flightId) {
                returnBookedFlight = await bookedFlightController.create(returnBookingData);
            }

            bookingData = {
                ...req.body.bookingData,
                bookedFlightId: bookedFlight.id,
                ...(returnBookingData.flightId && {
                    returnBookedFlightId : returnBookedFlight.id
                })
            };
            const passengersData = req.body.passengersData;

            const response = await bookingService.createBooking(bookingData, passengersData);
            scheduleBookingStatusUpdate(response.booking.id, response.booking.createdAt)
            await transporter.sendMail({
                to: email,
                subject: 'Booking Succesfull',
                text: `Your Booking is successfull. Pls complete the payment process within 30 mins do avoid rejection`
            });
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

    async getBookings(req, res){
        try {
            const {userId} = req.body;
            const bookings = await bookingService.getBookings(userId);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully fetched bookings',
                success: true,
                err: {},
                data: bookings
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch bookings',
                success: false,
                err: error.message,
                data: {}
            });
        }
    }

    async getBookingById(req, res){
        try {
            const {bookingId} = req.body;
            const booking = await bookingService.getBookingById(bookingId);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully fetched booking',
                success: true,
                err: {},
                data: booking
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch booking',
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

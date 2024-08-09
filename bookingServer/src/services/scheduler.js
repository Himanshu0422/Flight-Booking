const schedule = require('node-schedule');
const { Op } = require('sequelize');
const {Booking, BookedFlights} = require('../models/index');

function scheduleBookingStatusUpdate(bookingId, createdAt) {
  const thirtyMinutesLater = new Date(new Date(createdAt).getTime() + 30 * 60 * 1000);
  console.log(thirtyMinutesLater);
  

  schedule.scheduleJob(thirtyMinutesLater, async () => {
    try {
      const booking = await Booking.findByPk(bookingId);
      const bookedFlight = await BookedFlights.findByPk(booking.bookedFlightId);
      const totalSeats = bookedFlight.noOfSeats;
      const seats = booking.bookedSeats;

      if (booking && booking.status === 'InProcess') {
        await Booking.update(
          { status: 'Rejected' },
          { where: { id: bookingId } }
        );
        await BookedFlights.update(
          { noOfSeats: totalSeats-seats},
          { where: { id: booking.bookedFlightId } }
        )
        console.log(`Booking ${bookingId} status updated to 'Rejected'`);
      }
    } catch (error) {
      console.log('Error updating booking status:', error);
    }
  });
}

module.exports = { scheduleBookingStatusUpdate };

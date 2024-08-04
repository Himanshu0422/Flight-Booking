const axios = require('axios');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const BookedFlightRepository = require('../repository/bookedFlight-repository');
const { NUMBER } = require('sequelize');

class BookedFlightService {
  constructor() {
    this.bookedFlightRepository = new BookedFlightRepository();
  }

  async createBookedFlight(data) {
    try {
      const flightId = data.flightId;
      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      if (data.noOfSeats > flightData.totalSeats) {
        console.log('Something went wrong in the booking process', 'Insufficient seats in the flight');
      }
      let bookedFlight = await this.bookedFlightRepository.findByFlightId(flightId);
      if (bookedFlight) {
        const noOfSeats = data.noOfSeats;
        bookedFlight.noOfSeats += noOfSeats;
        bookedFlight = await bookedFlight.save();
      } else {
        bookedFlight = await this.bookedFlightRepository.create(data);
      }
      return bookedFlight;
    } catch (error) {
      console.log(error);
      if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
        throw error;
      }
    }
  }
}

module.exports = BookedFlightService;
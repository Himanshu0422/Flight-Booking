const { FlightRepository, AirplaneRepository } = require('../repository/index');

class FlightService {

    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }

    async createFlight(data) {
        try {
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({ ...data, totalSeats: airplane.capacity });
            return flight;
        } catch (error) {
            console.log('Something went wrong at service layer');
            throw { error };
        }
    }

    async getAllFlightData({page, ...data}) {
        try {
            const flights = await this.flightRepository.getAllFlights(data, page);
            return flights;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await this.flightRepository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }

    async updateFlight(flightId, data) {
        try {
            const response = await this.flightRepository.updateFlights(flightId, data);
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }
}

module.exports = FlightService;
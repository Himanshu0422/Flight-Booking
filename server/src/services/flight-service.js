const { FlightRepository, AirplaneRepository } = require('../repository/index');

class FlightService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }

    // Method to create a flight
    async createFlight(data) {
        try {
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            if (!airplane) {
                throw new Error('Airplane not found.');
            }

            const flight = await this.flightRepository.createFlight({ ...data, totalSeats: airplane.capacity });
            return flight;
        } catch (error) {
            console.error('Error in createFlight service:', error);
            throw { status: 400, message: error.message || 'Failed to create flight' };
        }
    }

    // Method to get all flight data with optional pagination
    async getAllFlightData({ page, ...data }) {
        try {
            const flights = await this.flightRepository.getAllFlights(data, page);
            return flights; 
        } catch (error) {
            console.error('Error in getAllFlightData service:', error);
            throw { status: 500, message: 'Failed to fetch flights' };
        }
    }

    // Method to get a specific flight by its ID
    async getFlight(flightId) {
        try {
            const flight = await this.flightRepository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.error('Error in getFlight service:', error);
            throw { status: 404, message: 'Flight not found' };
        }
    }

    // Method to update a flight's details
    async updateFlight(flightId, data) {
        try {
            const response = await this.flightRepository.updateFlights(flightId, data);
            return response;
        } catch (error) {
            console.error('Error in updateFlight service:', error);
            throw { status: 400, message: 'Failed to update flight' };
        }
    }
}

module.exports = FlightService;
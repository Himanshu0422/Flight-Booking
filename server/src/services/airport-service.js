const { AirportRepository } = require('../repository/index');

const airportRepository = new AirportRepository();

class AirportService{
    async create(data){
        try {
            const response = await airportRepository.create(data);
            return response;
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw {error};
        }
    }

    async get(data){
        try {
            const response = await airportRepository.get(data);
            return response;
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw {error};
        }
    }
}

module.exports = AirportService;
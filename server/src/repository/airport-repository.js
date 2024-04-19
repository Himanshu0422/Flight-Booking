const { Airport } = require('../models/index');

class AirportRepository{
    async create(data){
        try {
            const airport = await Airport.create(data);
            return airport;
        } catch (error) {
            console.log('Something went wrong in repository layer');
            throw {error};
        }
    }
}

module.exports = AirportRepository;
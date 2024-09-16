const { Airport } = require('../models/index');
const { redis } = require('../config/redis');

class AirportRepository {
    async create(data) {
        try {
            const airport = await Airport.create(data);
            await redis.del('airports:all');
            return airport;
        } catch (error) {
            console.log('Something went wrong in repository layer');
            throw { error };
        }
    }

    async get(data) {
        try {
            const cachedAirport = await redis.get(`airport:city:${data}`);
            
            if (cachedAirport) {
                console.log('Serving airport from cache');
                return JSON.parse(cachedAirport);
            }

            const airport = await Airport.findOne({ where: { city: data } });
            
            if (airport) {
                await redis.set(`airport:city:${data}`, JSON.stringify(airport), 'EX', 3600);
            }

            return airport;
        } catch (error) {
            console.log('Something went wrong in repository layer');
            throw { error };
        }
    }

    async getAll() {
        try {
            const cachedAirports = await redis.get('airports:all');

            if (cachedAirports) {
                console.log('Serving all airports from cache');
                return JSON.parse(cachedAirports);
            }

            const airports = await Airport.findAll();

            if (airports) {
                await redis.set('airports:all', JSON.stringify(airports), 'EX', 3600);
            }

            return airports;
        } catch (error) {
            console.log('Something went wrong in repository layer');
            throw { error };
        }
    }
}

module.exports = AirportRepository;

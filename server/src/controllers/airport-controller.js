const { AirportService } = require('../services/index');

const airportService = new AirportService();

const create = async (req, res) => {
    try {
        const response = await airportService.create(req.body);
        return res.status(201).json({
            message: 'Successfully created the airport',
            err: {},
            data: response,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Cannot create a new airport'
        })
    }
}

const get = async (req, res) => {
    try {
        const response = await airportService.get(req.query.city);
        return res.status(200).json({
            message: 'Successfully fetched the airport',
            err: {},
            data: response,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Cannot find the airport'
        })
    }
}

const getAll = async (req, res) => {
    try {
        const response = await airportService.getAll();
        return res.status(200).json({
            message: 'Successfully fetched the airport',
            err: {},
            data: response,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Cannot find the airport'
        })
    }
}

module.exports = {
    create,
    get,
    getAll
}
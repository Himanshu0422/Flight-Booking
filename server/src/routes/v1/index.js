const express = require('express');
const AirportController = require('../../controllers/airport-controller');
const FlightController = require('../../controllers/flight-controller');

const router = express.Router();

router.post('/airport', AirportController.create);

router.post('/flights', FlightController.create);

module.exports = router;
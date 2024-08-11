const express = require('express');
const AirportController = require('../../controllers/airport-controller');
const FlightController = require('../../controllers/flight-controller');

const router = express.Router();

router.post('/airport', AirportController.create);
router.get('/airport', AirportController.get);
router.get('/getAllAirport', AirportController.getAll)

router.post('/flights', FlightController.create);
router.get('/flights', FlightController.getAll);
router.get('/flights/:id', FlightController.get);
router.patch('/flights/:id', FlightController.update);

module.exports = router;
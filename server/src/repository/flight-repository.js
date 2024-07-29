const { Flights, Airplane, Airport, sequelize } = require("../models/index");
const { Op } = require("sequelize");

class FlightRepository {
	#createFilter(data) {
		let filter = {};

		if (data.arrivalAirportId) {
			filter.arrivalAirportId = data.arrivalAirportId;
		}

		if (data.departureAirportId) {
			filter.departureAirportId = data.departureAirportId;
		}

		let priceFilter = [];
		if (data.minPrice) {
			priceFilter.push({ price: { [Op.gte]: data.minPrice } });
		}
		if (data.maxPrice) {
			priceFilter.push({ price: { [Op.lte]: data.maxPrice } });
		}

		let timeFilter = [];
		if (data.time) {
			const [hours, minutes] = data.time.split(":").map(Number);

			let nextHour = hours + 1;

			if (nextHour === 24) {
				nextHour = 0;
			}

			const nextHourString = nextHour.toString().padStart(2, "0");
			const minutesString = minutes.toString().padStart(2, "0");

			const updatedTime = `${nextHourString}:${minutesString}`;

			timeFilter.push({ departureTime: { [Op.gte]: updatedTime } });
		}

		let dateFilter = [];
		if (data.date) {
			const date = new Date(data.date);
			const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

			console.log(dayOfWeek, 'dayofWeek');

			dateFilter.push({
				[Op.and]: [
					sequelize.where(
						sequelize.json('operatingDays'),
						Op.like,
						`%${dayOfWeek}%`
					)
				]
			});

		}


		if (priceFilter.length > 0 || timeFilter.length > 0 || dateFilter.length > 0) {
			filter[Op.and] = [];

			if (priceFilter.length > 0) {
				filter[Op.and].push({ [Op.and]: priceFilter });
			}

			if (timeFilter.length > 0) {
				filter[Op.and].push({ [Op.and]: timeFilter });
			}

			if (dateFilter.length > 0) {
				filter[Op.and].push(...dateFilter);
			}
		}

		return filter;
	}


	async createFlight(data) {
		try {
			const flight = await Flights.create(data);
			return flight;
		} catch (error) {
			console.log("Something went wrong in the repository layer");
			throw { error };
		}
	}

	async getFlight(flightId) {
		try {
			const flight = await Flights.findByPk({
				include: [
					{
						model: Airplane,
						as: 'Airplane',
						attributes: ['modelNumber', 'capacity']
					},
					{
						model: Airport,
						as: 'departureAirport',
						attributes: ['name', 'city']
					},
					{
						model: Airport,
						as: 'arrivalAirport',
						attributes: ['name', 'city']
					}
				],
				attributes: ['id', 'flightNumber', 'departureTime', 'arrivalTime', 'price', 'flightTime', 'nextDay']
			});
			return flight;
		} catch (error) {
			console.log("Something went wrong in the repository layer");
			throw { error };
		}
	}

	async getAllFlights(filter) {
		try {
			const filterObject = this.#createFilter(filter);
			const flights = await Flights.findAll({
				where: filterObject,
				include: [
					{
						model: Airplane,
						as: 'Airplane',
						attributes: ['modelNumber', 'capacity']
					},
					{
						model: Airport,
						as: 'departureAirport',
						attributes: ['name', 'city']
					},
					{
						model: Airport,
						as: 'arrivalAirport',
						attributes: ['name', 'city']
					}
				],
				attributes: ['id', 'flightNumber', 'departureTime', 'arrivalTime', 'price', 'flightTime', 'nextDay']
			});
			return flights;
		} catch (error) {
			console.error("Something went wrong in the repository layer:", error);
			throw new Error('Error fetching flights');
		}
	}


	async updateFlights(flightId, data) {
		try {
			await Flights.update(data, {
				where: {
					id: flightId,
				},
			});
			return true;
		} catch (error) {
			console.log("Something went wrong in the repository layer");
			throw { error };
		}
	}
}

module.exports = FlightRepository;

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Flights', [
      {
        flightNumber: 'AI101',
        airplaneId: 1, // Assuming this ID exists in the Airplanes table
        departureAirportId: 1, // Assuming this ID exists in the Airports table
        arrivalAirportId: 2, // Assuming this ID exists in the Airports table
        departureTime: '2024-09-30 10:00',
        arrivalTime: '2024-09-30 12:00',
        price: 200,
        flightTime: '2h',
        nextDay: 0,
        operatingDays: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
        isInternational: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'AI102',
        airplaneId: 2,
        departureAirportId: 1,
        arrivalAirportId: 3,
        departureTime: '2024-09-30 14:00',
        arrivalTime: '2024-09-30 16:00',
        price: 250,
        flightTime: '2h',
        nextDay: 0,
        operatingDays: JSON.stringify(['Saturday', 'Sunday']),
        isInternational: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'AI201',
        airplaneId: 3,
        departureAirportId: 2,
        arrivalAirportId: 4,
        departureTime: '2024-09-30 08:00',
        arrivalTime: '2024-09-30 11:00',
        price: 350,
        flightTime: '3h',
        nextDay: 0,
        operatingDays: JSON.stringify(['Monday', 'Wednesday', 'Friday']),
        isInternational: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'AI202',
        airplaneId: 4,
        departureAirportId: 3,
        arrivalAirportId: 5,
        departureTime: '2024-09-30 18:00',
        arrivalTime: '2024-09-30 21:00',
        price: 400,
        flightTime: '3h',
        nextDay: 1,
        operatingDays: JSON.stringify(['Tuesday', 'Thursday']),
        isInternational: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'AI301',
        airplaneId: 5,
        departureAirportId: 4,
        arrivalAirportId: 1,
        departureTime: '2024-09-30 20:00',
        arrivalTime: '2024-09-30 23:00',
        price: 300,
        flightTime: '3h',
        nextDay: 1,
        operatingDays: JSON.stringify(['Friday', 'Saturday']),
        isInternational: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', null, {});
  }
};

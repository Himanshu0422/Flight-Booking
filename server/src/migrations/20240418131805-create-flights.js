'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      departureAirportId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      arrivalAirportId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      departureTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      arrivalTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      flightTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nextDay: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      operatingDays: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
      },
      isInternational: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};
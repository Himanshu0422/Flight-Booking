'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Airports', [
      {
        name: 'John F. Kennedy International Airport',
        city: 'New York',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Los Angeles International Airport',
        city: 'Los Angeles',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'O\'Hare International Airport',
        city: 'Chicago',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Heathrow Airport',
        city: 'London',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tokyo Haneda Airport',
        city: 'Tokyo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airports', null, {});
  }
};

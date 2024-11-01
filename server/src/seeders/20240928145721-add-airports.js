'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Airports', [
      {
        id: 1,
        name: 'John F. Kennedy International Airport',
        city: 'New York, USA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Los Angeles International Airport',
        city: 'Los Angeles, USA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'O\'Hare International Airport',
        city: 'Chicago, USA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Heathrow Airport',
        city: 'London, UK',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Tokyo Haneda Airport',
        city: 'Tokyo, Japan',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airports', null, {});
  }
};

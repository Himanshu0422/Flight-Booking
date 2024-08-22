'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      this.belongsTo(models.BookedFlights, {
        as: 'bookedFlight',
        foreignKey: 'bookedFlightId',
        targetKey: 'id'
      });
      this.hasMany(models.Passenger, {
        as: 'passengers',
        foreignKey: 'bookingId',
      });
    }
  }

  Booking.init({
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookedFlightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['InProcess', 'Booked', 'Cancelled', 'Rejected'],
      defaultValue: 'InProcess'
    },
    bookedSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};

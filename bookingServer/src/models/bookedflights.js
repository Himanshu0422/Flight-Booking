'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookedFlights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Booking, {
        as: 'bookings',
        foreignKey: 'bookedFlightId'
      });
    }
  }
  BookedFlights.init({
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    noOfSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'BookedFlights',
  });
  return BookedFlights;
};
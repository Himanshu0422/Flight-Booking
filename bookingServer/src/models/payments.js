'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Payments extends Model {
    static associate(models) {
      this.belongsTo(models.Booking, {
        as: 'bookings',
        foreignKey: 'booking_id',
        targetKey: 'id'
      });
    }
  }
  
  Payments.init({
    payment_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'initiated',
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    payment_details: {
      type: DataTypes.JSON,
    },
  }, {
    sequelize,
    modelName: 'Payments',
  });

  return Payments;
};

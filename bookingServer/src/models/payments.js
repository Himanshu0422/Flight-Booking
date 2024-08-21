'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payments.init({
    payment_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    booking_id: {
      type: DataTypes.STRING,
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
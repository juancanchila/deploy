'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerificationAttempt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VerificationAttempt.init({
    userId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    code: DataTypes.STRING,
    wasVerified: DataTypes.BOOLEAN,
    attemptedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'VerificationAttempt',
  });
  return VerificationAttempt;
};
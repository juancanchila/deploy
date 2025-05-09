'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordResetAttempt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PasswordResetAttempt.init({
    userId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    attemptedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PasswordResetAttempt',
  });
  return PasswordResetAttempt;
};
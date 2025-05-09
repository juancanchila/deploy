'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserOTP.init({
    userId: DataTypes.INTEGER,
    otpCodeHash: DataTypes.STRING,
    isValidated: DataTypes.BOOLEAN,
    validatedAt: DataTypes.DATE,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserOTP',
  });
  return UserOTP;
};
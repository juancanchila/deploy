'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientLicense extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  ClientLicense.init({
    client_id: DataTypes.INTEGER,
    licenseCount: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    expiryDate: DataTypes.DATE,
    available: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClientLicense',
  });
  return ClientLicense;
};

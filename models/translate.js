'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Translate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Translate.init({
    original: DataTypes.STRING,
    translated: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Translate',
  });
  return Translate;
};
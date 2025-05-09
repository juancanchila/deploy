// models/area.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    static associate(models) {
      // Un cliente puede tener muchas áreas
      Area.belongsTo(models.Client, {
        foreignKey: 'clientId',
        as: 'client',
      });
    }
  }

  Area.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }
  }, {
    sequelize,
    modelName: 'Area',
  });

  return Area;
};

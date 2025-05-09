// models/licencia.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Licencia extends Model {
    static associate(models) {
      // Un cliente puede tener muchas licencias
      Licencia.belongsTo(models.Client, {
        foreignKey: 'clientId',
        as: 'client',
      });
    }
  }

  Licencia.init({
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    expirationDate: DataTypes.DATE,
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
    modelName: 'Licencia',
  });

  return Licencia;
};

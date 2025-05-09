'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CostCenter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir asociaciones aquí, si es necesario
      // Ejemplo: 
      // CostCenter.belongsTo(models.Client, { foreignKey: 'clientId' });
    }
  }

  // Inicialización del modelo CostCenter
  CostCenter.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'El código es obligatorio' },
        notEmpty: { msg: 'El código no puede estar vacío' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Puede ser opcional si se desea
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'El ID del cliente debe ser un número entero' },
        notNull: { msg: 'El ID del cliente es obligatorio' }
      }
    }
  }, {
    sequelize,
    modelName: 'CostCenter',
  });

  return CostCenter;
};

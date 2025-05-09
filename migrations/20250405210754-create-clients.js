'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      // Relación: un cliente puede tener muchos subclientes
      Client.hasMany(models.Client, {
        foreignKey: 'parentClientId',
        as: 'subClients',
      });

      // Relación: un cliente puede tener un cliente padre
      Client.belongsTo(models.Client, {
        foreignKey: 'parentClientId',
        as: 'parentClient',
      });
    }
  }

  Client.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentClientId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subClientLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: [7, 20] // ejemplo
      }
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    department: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    branchType: {
      type: DataTypes.ENUM('principal', 'sucursal'),
      defaultValue: 'sucursal'
    },
    logo: DataTypes.STRING,
    employeeCount: DataTypes.INTEGER,
    contact1Name: DataTypes.STRING,
    contact1Phone: DataTypes.STRING,
    contact2Name: DataTypes.STRING,
    contact2Phone: DataTypes.STRING,
    nit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    centroDeCosto: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'Clients', // opcional si deseas definir el nombre explícitamente
    timestamps: true      // creado y actualizado automáticamente
  });

  return Client;
};

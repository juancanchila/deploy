'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    objectId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    objectType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true // <- permitir nulos inicialmente para evitar errores
    }
  }, {});

  Log.associate = function(models) {
    // Asociación con Users (si aplica)
    Log.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    // Asociación con Clients
    Log.belongsTo(models.Client, {
      foreignKey: 'clientId',
      as: 'client',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Log;
};

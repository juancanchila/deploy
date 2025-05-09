'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      // 🔗 UserRole belongs to User
      UserRole.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      // 🔗 UserRole belongs to Role
      UserRole.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });

      // 🔗 (opcional) UserRole belongs to Client
      UserRole.belongsTo(models.Client, {
        foreignKey: 'clientId',
        as: 'client'
      });
    }
  }

  UserRole.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'UserRoles', // Asegura que coincida con el `through`
    timestamps: true
  });

  return UserRole;
};

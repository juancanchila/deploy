'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // 🔗 User belongs to Client
      User.belongsTo(models.Client, {
        foreignKey: 'clientId',
        as: 'client'
      });

      // 🔗 User has many OTPs
      User.hasMany(models.UserOTP, {
        foreignKey: 'userId',
        as: 'otps'
      });

      // 🔗 User belongs to many Roles through UserRoles
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: 'userId',
        otherKey: 'roleId',
        as: 'roles'
      });
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    isIdentityValidated: DataTypes.BOOLEAN,
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    city: DataTypes.STRING // ✅ Agregado aquí
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};

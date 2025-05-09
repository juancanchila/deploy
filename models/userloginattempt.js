module.exports = (sequelize, DataTypes) => {
  const UserLoginAttempt = sequelize.define('UserLoginAttempt', {
    userId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true, // <- permite null para evitar errores si no lo mandas
    },
  }, {
    tableName: 'UserLoginAttempts',
    timestamps: true,
  });

  return UserLoginAttempt;
};

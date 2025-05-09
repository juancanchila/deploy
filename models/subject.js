module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    subjectId: {
      type: DataTypes.STRING,
      allowNull: false,  // Si lo haces obligatorio
      defaultValue: 0,   // Valor por defecto si es necesario
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subjectToken: DataTypes.STRING,
    subjectEmail: DataTypes.STRING,
    subjectMobile: DataTypes.STRING,
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: true,  // O puedes hacerlo false si quieres que sea obligatorio
      defaultValue: 0
    }
  });

  Subject.associate = function(models) {
    // Aquí defines las relaciones si las hay (por ejemplo, con User)
    // Subject.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Subject;
};

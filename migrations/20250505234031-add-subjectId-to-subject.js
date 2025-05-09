'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Aquí agregarás el campo subjectId a la tabla Subject
    await queryInterface.addColumn('Subjects', 'subjectId', {
      type: Sequelize.INTEGER,
      allowNull: false,  // Si no deseas que sea null
      defaultValue: 0,   // Valor por defecto (si es necesario)
    });
  },

  down: async (queryInterface, Sequelize) => {
    // En la función down, puedes eliminar el campo si es necesario revertir la migración
    await queryInterface.removeColumn('Subjects', 'subjectId');
  }
};

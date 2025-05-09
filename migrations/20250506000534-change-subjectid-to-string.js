'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Subjects', 'subjectId', {
      type: Sequelize.STRING,
      allowNull: true // o false según tu lógica
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Subjects', 'subjectId', {
      type: Sequelize.INTEGER, // si antes era INTEGER
      allowNull: true
    });
  }
};

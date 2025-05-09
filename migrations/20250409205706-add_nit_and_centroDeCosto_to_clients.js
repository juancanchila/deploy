'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clients', 'nit', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Clients', 'centroDeCosto', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clients', 'nit');
    await queryInterface.removeColumn('Clients', 'centroDeCosto');
  }
};

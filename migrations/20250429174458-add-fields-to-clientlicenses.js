'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn('ClientLicenses', 'startDate', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn('ClientLicenses', 'expiryDate', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn('ClientLicenses', 'available', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn('ClientLicenses', 'startDate'),
      queryInterface.removeColumn('ClientLicenses', 'expiryDate'),
      queryInterface.removeColumn('ClientLicenses', 'available'),
    ]);
  },
};

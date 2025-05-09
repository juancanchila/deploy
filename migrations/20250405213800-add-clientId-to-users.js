'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'clientId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Clients',
        key: 'id'
      },
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'clientId');
  }
};

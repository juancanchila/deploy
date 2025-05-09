'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Logs', 'clientId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Logs', 'clientId');
  }
};

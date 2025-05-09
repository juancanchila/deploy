'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      'Users',
      { isIdentityValidated: true },
      { username: 'superadmin' }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      'Users',
      { isIdentityValidated: false },
      { username: 'superadmin' }
    );
  }
};

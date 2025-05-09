'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Super Admin',
        description: 'Usuario con acceso total al sistema',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin',
        description: 'Administrador del cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Evaluador',
        description: 'Encargado de evaluar información',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'View',
        description: 'Solo lectura',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};

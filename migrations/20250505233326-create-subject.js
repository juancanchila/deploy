'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subjectName: {
        type: Sequelize.STRING
      },
      subjectToken: {
        type: Sequelize.STRING
      },
      subjectEmail: {
        type: Sequelize.STRING
      },
      subjectMobile: {
        type: Sequelize.STRING
      },
      clientId: {
        type: Sequelize.INTEGER
      },
      areaId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subjects');
  }
};
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExamSubjects', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      subjectId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      examId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      examUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      templateId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExamSubjects');
  }
};

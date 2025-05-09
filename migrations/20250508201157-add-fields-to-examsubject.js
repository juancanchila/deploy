'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ExamSubjects', 'customerId', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('ExamSubjects', 'examLocale', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('ExamSubjects', 'examQueued', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('ExamSubjects', 'examStatus', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('ExamSubjects', 'examStep', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('ExamSubjects', 'clientId', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ExamSubjects', 'customerId');
    await queryInterface.removeColumn('ExamSubjects', 'examLocale');
    await queryInterface.removeColumn('ExamSubjects', 'examQueued');
    await queryInterface.removeColumn('ExamSubjects', 'examStatus');
    await queryInterface.removeColumn('ExamSubjects', 'examStep');
    await queryInterface.removeColumn('ExamSubjects', 'clientId');
  }
};

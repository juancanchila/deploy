'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subjects', [
      {

        subjectEmail: 'john@example.com',
        subjectId: 'feace3d1853841c6a1c49d007ad1c0a9',
        subjectMobile: '1234567890',

        subjectName: 'John Smith',
        subjectToken: 'abc123',
        clientId: 1,
        areaId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {

        subjectEmail: 'john@example.com',
        subjectId: '6f1f1eb9dd8d4bf798f131ba65ec9f37',
        subjectMobile: '1234567890',
        subjectName: 'John Smith',
        subjectToken: 'abc123',
        clientId: 1,
        areaId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subjects', null, {});
  }
};

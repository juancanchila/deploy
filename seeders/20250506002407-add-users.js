'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subjects', [
      {

        subjectEmail: 'elizabedj16@gmail.com',
        subjectId: '1b1b0cf222a04b7bbfeafeeff7a95283',
        subjectMobile: '3175820796',

        subjectName: 'TATIANA ELIZABED JIMENEZ GARZÓN',
        subjectToken: '1012423984',
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

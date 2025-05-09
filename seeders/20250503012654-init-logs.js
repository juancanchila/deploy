'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const userId = 47;
    const clientId = 1;
    const accion = 'POST';
    const objectType = 'Evaluado';

    const objectIds = [
      '6f1f1eb9dd8d4bf798f131ba65ec9f37',
      'feace3d1853841c6a1c49d007ad1c0a9',
      '49b9e835604347759bc25e74947e0f47',
      '8b58215fc8fd435b9f084e0f7efd375b',
      '117e3cdca23a483ba011ab690a7b613a'
    ];

    const logs = objectIds.map(id => ({
      userId,
      clientId,
      accion,
      objectId: id,
      objectType,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('Logs', logs);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Logs', {
      userId: 47,
      clientId: 1,
      accion: 'POST',
      objectType: 'Evaluado'
    });
  }
};

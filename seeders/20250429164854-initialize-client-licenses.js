// En el archivo generado, en `seeders/<timestamp>-initialize-client-licenses.js`
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ClientLicenses', [{
      client_id: 1,  // ID del cliente
      licenseCount: 2000,  // Número de licencias
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ClientLicenses', null, {});
  }
};

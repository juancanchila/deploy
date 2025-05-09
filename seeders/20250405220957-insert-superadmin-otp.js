'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const otp = '123456'; // OTP de prueba
    const otpHash = await bcrypt.hash(otp, 10); // Hasheamos el OTP

    await queryInterface.bulkInsert('UserOTPs', [{
      userId: 49,
      otpCodeHash: otpHash,
      isValidated: true,
      validatedAt: new Date(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Expira en 5 minutos
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserOTPs', { userId: 49 }, {});
  }
};

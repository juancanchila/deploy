'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔍 Obtener cliente y rol
    const [clients] = await queryInterface.sequelize.query(
      `SELECT id FROM Clients WHERE name = 'SOLFINT' LIMIT 1`
    );
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name = 'Super Admin' LIMIT 1`
    );

    const clientId = clients[0]?.id;
    const roleId = roles[0]?.id;

    if (!clientId || !roleId) {
      console.error('❌ Cliente o Rol no encontrado');
      return;
    }

    // 🆕 Obtener siguiente ID disponible para Users
    const [lastUsers] = await queryInterface.sequelize.query(
      `SELECT id FROM Users ORDER BY id DESC LIMIT 1`
    );
    const userId = (lastUsers[0]?.id || 0) + 1;

    // 🆕 Obtener siguiente ID disponible para Otps
    const [lastOtps] = await queryInterface.sequelize.query(
      `SELECT id FROM UserOTPs ORDER BY id DESC LIMIT 1`
    );
    const otpId = (lastOtps[0]?.id || 0) + 1;

    const hashedPassword = await bcrypt.hash('superadmin123', 10);

    // 👤 Insertar usuario
    await queryInterface.bulkInsert('Users', [{
      id: userId,
      username: 'superadmin',
      email: 'admin@solfint.com',
      password: hashedPassword,
      clientId: 1,
      isIdentityValidated: true,
      fullName: 'Admin',
      phone: '3004407026',
      whatsapp: '3004407026',
      jobTitle: 'dev',
      photoUrl: null,
      createdAt: new Date('2025-04-05T21:13:04.000Z'),
      updatedAt: new Date('2025-04-05T23:44:53.000Z')
    }]);

    // 🔗 Insertar UserRoles
    await queryInterface.bulkInsert('UserRoles', [{
      userId,
      roleId,
      clientId,
      createdAt: new Date('2025-04-05T22:29:22.000Z'),
      updatedAt: new Date('2025-04-05T22:29:22.000Z')
    }]);

    // 🔐 Insertar OTP
    await queryInterface.bulkInsert('UserOTPs', [{
      id: otpId,
      userId,
      otpCodeHash: '$2b$10$OYVW8zBA1b2xuKiBrdea..6B8a4rr7JxqsKSsUWoQWEbwFLhxwvUq',
      isValidated: true,
      validatedAt: new Date('2025-04-05T22:10:42.000Z'),
      expiresAt: new Date('2025-04-05T22:15:42.000Z'),
      createdAt: new Date('2025-04-05T22:10:42.000Z'),
      updatedAt: new Date('2025-04-05T22:10:42.000Z')
    }]);

    console.log(`✅ Usuario superadmin creado con ID dinámico: ${userId}`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserOTPs', { userId: { [Sequelize.Op.gt]: 0 } });
    await queryInterface.bulkDelete('UserRoles', { userId: { [Sequelize.Op.gt]: 0 } });
    await queryInterface.bulkDelete('Users', { email: 'admin@solfint.com' });
  }
};

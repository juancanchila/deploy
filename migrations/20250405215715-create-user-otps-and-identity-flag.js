'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla UserOTPs
    await queryInterface.createTable('UserOTPs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      otpCodeHash: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isValidated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      validatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Agregar campo isIdentityValidated a Users
    await queryInterface.addColumn('Users', 'isIdentityValidated', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'isIdentityValidated');
    await queryInterface.dropTable('UserOTPs');
  }
};

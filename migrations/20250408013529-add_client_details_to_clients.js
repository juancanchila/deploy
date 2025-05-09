'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Clients', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'subClientLimit', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    });
    await queryInterface.addColumn('Clients', 'phone', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'address', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'city', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'department', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'postalCode', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'branchType', {
      type: Sequelize.ENUM('principal', 'sucursal'),
      allowNull: false,
      defaultValue: 'sucursal'
    });
    await queryInterface.addColumn('Clients', 'logo', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'employeeCount', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'contact1Name', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'contact1Phone', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'contact2Name', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clients', 'contact2Phone', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Clients', 'description');
    await queryInterface.removeColumn('Clients', 'subClientLimit');
    await queryInterface.removeColumn('Clients', 'phone');
    await queryInterface.removeColumn('Clients', 'address');
    await queryInterface.removeColumn('Clients', 'city');
    await queryInterface.removeColumn('Clients', 'department');
    await queryInterface.removeColumn('Clients', 'postalCode');
    await queryInterface.removeColumn('Clients', 'email');
    await queryInterface.removeColumn('Clients', 'branchType');
    await queryInterface.removeColumn('Clients', 'logo');
    await queryInterface.removeColumn('Clients', 'employeeCount');
    await queryInterface.removeColumn('Clients', 'contact1Name');
    await queryInterface.removeColumn('Clients', 'contact1Phone');
    await queryInterface.removeColumn('Clients', 'contact2Name');
    await queryInterface.removeColumn('Clients', 'contact2Phone');

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Clients_branchType";');
  }
};

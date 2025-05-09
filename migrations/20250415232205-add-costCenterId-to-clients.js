module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar la columna costCenterId a la tabla Clients
    await queryInterface.addColumn('Clients', 'costCenterId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Si el cliente no tiene un centro de costo, este campo puede ser NULL
      references: {
        model: 'CostCenters', // Relaciona con la tabla CostCenters
        key: 'id', // Relaciona con la columna id de la tabla CostCenters
      },
      onUpdate: 'CASCADE', // Si el id de CostCenter cambia, actualiza este campo en Clients
      onDelete: 'SET NULL', // Si se elimina un CostCenter, establece este campo a NULL
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Si revertimos la migración, eliminamos la columna costCenterId
    await queryInterface.removeColumn('Clients', 'costCenterId');
  }
};

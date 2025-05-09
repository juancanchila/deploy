// src/tests/check-db.js
const sequelize = require('../config/dbConfig');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos: OK');
    process.exit(0); // Éxito
  } catch (error) {
    console.error('❌ Conexión fallida:', error.message);
    process.exit(1); // Error
  }
})();

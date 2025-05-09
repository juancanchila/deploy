const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('solfintdb', 'root', '1q2w3e4r5tPD!!', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // o true si quieres ver los queries
});

module.exports = sequelize;

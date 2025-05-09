'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Translates', [
      { original: 'Águilas de Oro - Preempleo-Robo-Falsificación Docs-Vínculos-Secu', translated: 'Examen 1', createdAt: new Date(), updatedAt: new Date() },
      { original: 'Águilas de Oro - rutina-Robo, Fuga, Vínculos, Falsificación', translated: 'Examen 2', createdAt: new Date(), updatedAt: new Date() },
      { original: 'ALPHA - Preempleo-Robo-Falsificación Docs-Vínculos-Secuestro', translated: 'Examen 3', createdAt: new Date(), updatedAt: new Date() },
      { original: 'ALPHA - prueba rutina-Robo, Fuga, Vínculos, Falsificación', translated: 'Examen 4', createdAt: new Date(), updatedAt: new Date() },
      { original: 'Demo corta - consumo de drogas', translated: 'Examen 5', createdAt: new Date(), updatedAt: new Date() },
      { original: 'Excelcredit - Preempleo-Mentir Formulario-Robo-Vínculos-Secuestr', translated: 'Examen 6', createdAt: new Date(), updatedAt: new Date() },
      { original: 'Excelcredit - rutina-Robo, Fuga, Vínculos, Falsificación', translated: 'Examen 7', createdAt: new Date(), updatedAt: new Date() },
      { original: 'FIDELITY - Preempleo-Robo-Falsificación Docs-Vínculos-Secuestro', translated: 'Examen 8', createdAt: new Date(), updatedAt: new Date() },
      { original: 'FIDELITY - prueba rutina-Robo, Fuga, Vínculos, Falsificación', translated: 'Examen 9', createdAt: new Date(), updatedAt: new Date() },
      { original: 'Seguridad Alpha - Formulario', translated: 'Examen 10', createdAt: new Date(), updatedAt: new Date() },
      { original: 'Shipping - Preempleo-Robo-Falsificación Docs-Vínculos-Secu', translated: 'Examen 11', createdAt: new Date(), updatedAt: new Date() },
      { original: 'Shipping - rutina-Robo, Fuga, Vínculos, Falsificación', translated: 'Examen 12', createdAt: new Date(), updatedAt: new Date() },
      { original: 'V3R - Visita domiciliaria', translated: 'Examen 13', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Translates', null, {});
  }
};

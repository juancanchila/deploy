const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/examController');

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Gestión de logs de exámenes
 */

/**
 * @swagger
 * /api/v1/logs:
 *   get:
 *     summary: Obtener registros (logs) de exámenes
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Logs de exámenes obtenidos exitosamente
 *       404:
 *         description: No se encontraron logs
 *       500:
 *         description: Error al obtener los logs
 */
router.get('/', getLogs);

module.exports = router;

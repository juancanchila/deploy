const express = require('express');
const router = express.Router();
const { getCatalogListExam } = require('../controllers/examController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/v1/getCatalogListExam:
 *   get:
 *     summary: Obtener lista de catálogos
 *     tags: [Catalogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de catálogos
 *       401:
 *         description: No autorizado
 */
router.get('/', verifyToken, getCatalogListExam);

module.exports = router;

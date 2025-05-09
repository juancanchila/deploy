const express = require('express');
const router = express.Router();
const { getCatalogList,getCatalogId,createExam } = require('../controllers/examController');
const { verifyToken } = require('../middlewares/authMiddleware');
/**
 * @swagger
 * /api/v1/Catalog:
 *   get:
 *     summary: Obtener lista de catalogos
 *     tags: [Catalogs]
 *     responses:
 *       200:
 *         description: Lista de catalogos
 */
router.get('/',verifyToken, getCatalogList);

/**
 * @swagger
 * /api/v1/Catalog:
 *   post:
 *     summary: Crear un nuevo exam desde un catálogo
 *     tags: [Exams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               areaId:
 *                 type: integer
 *               tipoDePrueba:
 *                 type: string
 *               templateId:
 *                 type: string
 *               localeId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Exam creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', verifyToken, require('../controllers/examController').createExam);
/**
 * @swagger
 * /api/v1/Catalog/{CatalogId}:
 *   get:
 *     summary: Obtener un Catalog por CatalogId
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: CatalogId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Catalog
 *     responses:
 *       200:
 *         description: Datos del Catalog
 *       404:
 *         description: Catalogt no encontrado
 */
router.get('/:CatalogId', verifyToken,getCatalogId);

module.exports = router;
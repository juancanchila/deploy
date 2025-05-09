const express = require('express');
const router = express.Router();
const {
    createTranslate,
    getTranslates,
    getTranslateById,
    updateTranslate,
    deleteTranslate
} = require('../controllers/translateController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/v1/translations:
 *   get:
 *     summary: Obtener todas las traducciones
 *     tags: [Traducciones]
 *     responses:
 *       200:
 *         description: Lista de traducciones
 */
router.get('/', verifyToken, getTranslates);

/**
 * @swagger
 * /api/v1/translations/{id}:
 *   get:
 *     summary: Obtener una traducción por ID
 *     tags: [Traducciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la traducción
 *     responses:
 *       200:
 *         description: Traducción encontrada
 *       404:
 *         description: Traducción no encontrada
 */
router.get('/:id', verifyToken, getTranslateById);

/**
 * @swagger
 * /api/v1/translations:
 *   post:
 *     summary: Crear una nueva traducción
 *     tags: [Traducciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - original
 *               - translated
 *             properties:
 *               original:
 *                 type: string
 *               translated:
 *                 type: string
 *     responses:
 *       201:
 *         description: Traducción creada exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 */
router.post('/', verifyToken, createTranslate);

/**
 * @swagger
 * /api/v1/translations/{id}:
 *   put:
 *     summary: Actualizar una traducción existente
 *     tags: [Traducciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la traducción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               original:
 *                 type: string
 *               translated:
 *                 type: string
 *     responses:
 *       200:
 *         description: Traducción actualizada exitosamente
 *       404:
 *         description: Traducción no encontrada
 */
router.put('/:id', verifyToken, updateTranslate);

/**
 * @swagger
 * /api/v1/translations/{id}:
 *   delete:
 *     summary: Eliminar una traducción
 *     tags: [Traducciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la traducción
 *     responses:
 *       204:
 *         description: Traducción eliminada exitosamente
 *       404:
 *         description: Traducción no encontrada
 */
router.delete('/:id', verifyToken, deleteTranslate);

module.exports = router;

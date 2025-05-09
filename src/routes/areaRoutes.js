// routes/areaRoutes.js
const express = require('express');
const router = express.Router();
const {
    createArea,
    getAreas,
    getAreaById,
    updateArea,
    deleteArea
} = require('../controllers/areaController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/v1/areas/{clientId}:
 *   get:
 *     summary: Obtener todas las áreas de un cliente
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de áreas
 */
router.get('/:clientId', verifyToken, getAreas);

/**
 * @swagger
 * /api/v1/areas/{clientId}/{id}:
 *   get:
 *     summary: Obtener un área de un cliente por ID
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del área
 *     responses:
 *       200:
 *         description: Área encontrada
 *       404:
 *         description: Área no encontrada
 */
router.get('/:clientId/:id', verifyToken, getAreaById);

/**
 * @swagger
 * /api/v1/areas/{clientId}:
 *   post:
 *     summary: Crear una nueva área para un cliente
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente asociado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Área creada exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 */
router.post('/:clientId', verifyToken, createArea);

/**
 * @swagger
 * /api/v1/areas/{clientId}/{id}:
 *   put:
 *     summary: Actualizar un área existente
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del área
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Área actualizada exitosamente
 *       404:
 *         description: Área no encontrada
 */
router.put('/:clientId/:id', verifyToken, updateArea);

/**
 * @swagger
 * /api/v1/areas/{clientId}/{id}:
 *   delete:
 *     summary: Eliminar un área de un cliente
 *     tags: [Áreas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del área
 *     responses:
 *       204:
 *         description: Área eliminada exitosamente
 *       404:
 *         description: Área no encontrada
 */
router.delete('/:clientId/:id', verifyToken, deleteArea);

module.exports = router;

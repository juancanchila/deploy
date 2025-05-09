const express = require('express');
const router = express.Router();
const {
    getLicenses,         
    getLicenseById,       
    createLicense,        
    updateLicense,        
    deleteLicense         
} = require('../controllers/clientLincenceController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/v1/licenses/{clientId}:
 *   get:
 *     summary: Obtener todas las licenses de un cliente
 *     tags: [licenses]
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
 *         description: Lista de licenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/licenses'
 */
router.get('/:clientId', verifyToken, getLicenses);

/**
 * @swagger
 * /api/v1/licenses/{clientId}/{id}:
 *   get:
 *     summary: Obtener una licenses por ID de cliente y licenses
 *     tags: [licenses]
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
 *         description: ID de la licenses
 *     responses:
 *       200:
 *         description: licenses encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/licenses'
 *       404:
 *         description: licenses no encontrada
 */
router.get('/:clientId/:id', verifyToken, getLicenseById);

/**
 * @swagger
 * /api/v1/licenses/{clientId}:
 *   post:
 *     summary: Crear una nueva licenses para un cliente
 *     tags: [licenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/licenses'
 *     responses:
 *       201:
 *         description: licenses creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/licenses'
 *       400:
 *         description: Error al crear la licenses
 */
router.post('/:clientId', verifyToken, createLicense);

/**
 * @swagger
 * /api/v1/licenses/{clientId}/{id}:
 *   put:
 *     summary: Actualizar una licenses existente de un cliente
 *     tags: [licenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: clientId
 *         in: path
 *         required: true
 *         description: ID del cliente
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la licenses a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/licenses'
 *     responses:
 *       200:
 *         description: licenses actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/licenses'
 *       400:
 *         description: Error en los datos enviados
 */
router.put('/:clientId/:id', verifyToken, updateLicense);

/**
 * @swagger
 * /api/v1/licenses/{clientId}/{id}:
 *   delete:
 *     summary: Eliminar una licenses de un cliente
 *     tags: [licenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: clientId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la licenses a eliminar
 *     responses:
 *       204:
 *         description: licenses eliminada exitosamente
 *       404:
 *         description: licenses no encontrada
 */
router.delete('/:clientId/:id', verifyToken, deleteLicense);

module.exports = router;

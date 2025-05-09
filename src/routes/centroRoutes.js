const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const {
  createCostCenter,
  getCostCenterById,
  updateCostCenter,
  deleteCostCenter,
  getCostCenters
} = require('../controllers/costControlController');



/**
 * @swagger
 * /api/v1/cost/{clientId}:
 *   get:
 *     summary: Obtener todos los centros de costos de un cliente
 *     description: Recupera todos los centros de costos asociados a un cliente específico.
 *     tags:
 *       - Centros de Costos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de centros de costos.
 *       404:
 *         description: No se encontraron centros de costos para el cliente.
 */
router.get('/:clientId', verifyToken, getCostCenters);

/**
 * @swagger
 * /api/v1/cost/{clientId}:
 *   post:
 *     summary: Crea un centro de costos para un cliente
 *     description: Registra un nuevo centro de costos en el sistema, asociándolo con un cliente específico.
 *     tags:
 *       - Centros de Costos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - description
 *             properties:
 *               code:
 *                 type: string
 *                 description: Código del centro de costos
 *               description:
 *                 type: string
 *                 description: Descripción del centro de costos
 *     responses:
 *       201:
 *         description: Centro de costos creado exitosamente.
 *       400:
 *         description: Datos inválidos.
 */
router.post('/:clientId', verifyToken, createCostCenter);

/**
 * @swagger
 * /api/v1/cost/{clientId}/{id}:
 *   get:
 *     summary: Obtener un centro de costos por ID para un cliente
 *     description: Recupera los detalles de un centro de costos específico mediante su identificador y el ID del cliente.
 *     tags:
 *       - Centros de Costos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del centro de costos
 *     responses:
 *       200:
 *         description: Centro de costos encontrado.
 *       404:
 *         description: Centro de costos no encontrado.
 */
router.get('/:clientId/:id', verifyToken, getCostCenterById);

/**
 * @swagger
 * /api/v1/cost/{clientId}/{id}:
 *   put:
 *     summary: Actualizar un centro de costos para un cliente
 *     description: Modifica los datos de un centro de costos existente para un cliente específico.
 *     tags:
 *       - Centros de Costos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del centro de costos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Nuevo código del centro de costos
 *               description:
 *                 type: string
 *                 description: Nueva descripción del centro de costos
 *     responses:
 *       200:
 *         description: Centro de costos actualizado exitosamente.
 *       404:
 *         description: Centro de costos no encontrado.
 */
router.put('/:clientId/:id', verifyToken, updateCostCenter);

/**
 * @swagger
 * /api/v1/cost/{clientId}/{id}:
 *   delete:
 *     summary: Eliminar un centro de costos para un cliente
 *     description: Borra un centro de costos existente para un cliente específico.
 *     tags:
 *       - Centros de Costos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del centro de costos
 *     responses:
 *       204:
 *         description: Centro de costos eliminado exitosamente.
 *       404:
 *         description: Centro de costos no encontrado.
 */
router.delete('/:clientId/:id', verifyToken, deleteCostCenter);

module.exports = router;

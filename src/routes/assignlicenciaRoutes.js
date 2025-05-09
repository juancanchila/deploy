const express = require('express');
const router = express.Router();
const { assignLicenses } = require('../controllers/licenseController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/v1/assignlicenses/{clientId}/{licenseId}:
 *   post:
 *     summary: Asignar licencias desde un cliente origen a un cliente destino
 *     tags: [licenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente que transfiere (origen) las licencias
 *       - in: path
 *         name: licenseId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la licencia que se va a transferir
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - targetClientId
 *               - licenseCount
 *             properties:
 *               targetClientId:
 *                 type: integer
 *                 description: ID del cliente que recibe las licencias
 *               licenseCount:
 *                 type: integer
 *                 description: Número de licencias a asignar
 *     responses:
 *       201:
 *         description: Licencias asignadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Licencias asignadas correctamente
 *                 assigned:
 *                   $ref: '#/components/schemas/licenses'
 *                 sourceUpdated:
 *                   $ref: '#/components/schemas/licenses'
 *       400:
 *         description: Datos inválidos o licencias insuficientes
 *       500:
 *         description: Error del servidor
 */
router.post('/:clientId/:licenseId', verifyToken, assignLicenses);

module.exports = router;

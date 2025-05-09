const express = require('express');
const router = express.Router();
const {
    getClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} = require('../controllers/clientController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: SOLFINT
 *         parentClientId:
 *           type: integer
 *           nullable: true
 *           example: null
 *         description:
 *           type: string
 *           nullable: true
 *           example: null
 *         subClientLimit:
 *           type: integer
 *           example: 1
 *         phone:
 *           type: string
 *           nullable: true
 *           example: null
 *         address:
 *           type: string
 *           nullable: true
 *           example: null
 *         city:
 *           type: string
 *           nullable: true
 *           example: null
 *         department:
 *           type: string
 *           nullable: true
 *           example: null
 *         postalCode:
 *           type: string
 *           nullable: true
 *           example: null
 *         email:
 *           type: string
 *           nullable: true
 *           example: null
 *         branchType:
 *           type: string
 *           enum: [sucursal, principal]
 *           example: sucursal
 *         logo:
 *           type: string
 *           nullable: true
 *           example: null
 *         employeeCount:
 *           type: integer
 *           nullable: true
 *           example: null
 *         contact1Name:
 *           type: string
 *           nullable: true
 *           example: null
 *         contact1Phone:
 *           type: string
 *           nullable: true
 *           example: null
 *         contact2Name:
 *           type: string
 *           nullable: true
 *           example: null
 *         contact2Phone:
 *           type: string
 *           nullable: true
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-05T21:28:47.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-05T21:28:47.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Endpoints para la gestión de clientes
 */

/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
router.get('/', verifyToken, getClients);

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:id', verifyToken, getClientById);

/**
 * @swagger
 * /api/v1/clients:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Error al crear el cliente
 */
router.post('/', verifyToken, createClient);

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   put:
 *     summary: Actualizar un cliente existente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Error en los datos enviados
 */
router.put('/:id', verifyToken, updateClient);

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *     responses:
 *       204:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/:id', verifyToken, deleteClient);

module.exports = router;

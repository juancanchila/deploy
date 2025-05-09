// src/routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const { getRoles } = require('../controllers/roleController');
const { verifyToken } = require('../middlewares/authMiddleware');


/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     summary: Obtener todos los roles disponibles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Admin
 *                   description:
 *                     type: string
 *                     example: Acceso total al sistema
 */
router.get('/', verifyToken, getRoles);

module.exports = router;

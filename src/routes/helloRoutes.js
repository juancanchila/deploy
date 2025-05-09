// src/routes/helloRoutes.js
const express = require('express');
const { sayHello } = require('../controllers/helloController');
const router = express.Router();

/**
 * @swagger
 * /api/v1/hello:
 *   get:
 *     summary: Devuelve un saludo
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hola Mundo!
 */
router.get('/', sayHello);

module.exports = router;

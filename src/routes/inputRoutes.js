// src/routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const { createExamFromTemplate } = require('../controllers/examController');
const { verifyToken } = require('../middlewares/authMiddleware');


/**
 * @swagger
 * /api/v1/input:
 *   post:
 *     summary: Crear un examen desde una plantilla
 *     tags: [Examenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subjectId:
 *                 type: string
 *                 example: "12345"
 *               templateId:
 *                 type: string
 *                 example: "67890"
 *               templateInput:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                   example: "<Data site called Topic1, in test item PI.0001.01>"
 *     responses:
 *       200:
 *         description: Examen creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 examId:
 *                   type: string
 *                   example: "27dbecf527794aa888e033c35d68c659"
 *                 examUrl:
 *                   type: string
 *                   example: "https://verifeye.app.link/cKA89qKcwb"
 */

router.post('/', verifyToken, createExamFromTemplate);

module.exports = router;

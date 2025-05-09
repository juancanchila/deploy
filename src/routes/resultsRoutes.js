const express = require('express');
const router = express.Router();
const { getSubjectExamData } = require('../controllers/examController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/v1/results/{cedula}:
 *   get:
 *     summary: Obtener exámenes relacionados a un sujeto por cédula (subjectToken)
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de cédula del sujeto (subjectToken)
 *     responses:
 *       200:
 *         description: Información combinada del sujeto y sus exámenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   subject:
 *                     type: object
 *                     properties:
 *                       subjectId:
 *                         type: string
 *                       subjectName:
 *                         type: string
 *                       subjectEmail:
 *                         type: string
 *                       subjectMobile:
 *                         type: string
 *                       subjectToken:
 *                         type: string
 *                       clientId:
 *                         type: integer
 *                       areaId:
 *                         type: integer
 *                   examData:
 *                     type: object
 *                     description: Datos del examen provenientes de la API externa
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Sujeto o exámenes no encontrados
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:cedula', getSubjectExamData);

module.exports = router;

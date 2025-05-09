const express = require('express');
const router = express.Router();
const {
    createExamFromTemplate,
    getExamList,
    getExamById,
    getExamQuestionsById,
    getExamAnswer,
    getExamAnswerById,
    getQueue,
    deleteExamFromQueue
} = require('../controllers/examController');

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Gestión de exámenes
 */

/**
 * @swagger
 * /api/v1/exams:
 *   get:
 *     summary: Obtener la lista de todos los exámenes almacenados
 *     tags: [Exams]
 *     responses:
 *       200:
 *         description: Lista de exámenes recuperada exitosamente
 *       500:
 *         description: Error al obtener la lista de exámenes
 */
router.get('/', getExamList);

/**
 * @swagger
 * /api/v1/exams/{examId}:
 *   get:
 *     summary: Obtener un examen por ID
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del examen
 *     responses:
 *       200:
 *         description: Examen encontrado
 *       404:
 *         description: Examen no encontrado
 */
router.get('/:examId', getExamById);

/**
 * @swagger
 * /api/v1/exams/questions/{templateId}/{examId}:
 *   get:
 *     summary: Obtener preguntas del examen usando templateId y examId
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: templateId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la plantilla
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del examen
 *     responses:
 *       200:
 *         description: Preguntas del examen recuperadas correctamente
 *       500:
 *         description: Error al recuperar preguntas del examen
 */
router.get('/questions/:templateId/:examId', getExamQuestionsById);

/**
 * @swagger
 * /api/v1/exams/answers/{examId}:
 *   get:
 *     summary: Obtener respuestas generales del examen
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del examen
 *     responses:
 *       200:
 *         description: Respuestas recuperadas
 *       500:
 *         description: Error al obtener respuestas del examen
 */
router.get('/answers/:examId', getExamAnswer);

/**
 * @swagger
 * /api/v1/exams/answerDetails/{examId}:
 *   get:
 *     summary: Obtener detalles de las respuestas del examen
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del examen
 *     responses:
 *       200:
 *         description: Detalles de respuestas obtenidas
 *       500:
 *         description: Error al obtener detalles del examen
 */
router.get('/answerDetails/:examId', getExamAnswerById);

/**
 * @swagger
 * /api/v1/exams/template:
 *   post:
 *     summary: Crear examen a partir de plantilla
 *     tags: [Exams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subjectId
 *               - templateId
 *               - templateInput
 *             properties:
 *               subjectId:
 *                 type: string
 *               templateId:
 *                 type: string
 *               templateInput:
 *                 type: object
 *     responses:
 *       201:
 *         description: Examen creado exitosamente
 *       500:
 *         description: Error al crear el examen
 */
router.post('/template', createExamFromTemplate);


module.exports = router;

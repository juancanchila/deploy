const express = require('express');
const router = express.Router();
const { getSubjectList, getSubjectId, createSubject } = require('../controllers/examController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/v1/subjects:
 *   get:
 *     summary: Obtener lista de sujetos
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Lista de sujetos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   subjectName:
 *                     type: string
 *                     description: Nombre del sujeto
 *                     example: Juan Pérez
 *                   subjectToken:
 *                     type: string
 *                     description: Token del sujeto
 *                     example: abc123token
 *                   subjectEmail:
 *                     type: string
 *                     description: Correo del sujeto
 *                     example: juan@example.com
 *                   subjectMobile:
 *                     type: string
 *                     description: Número de celular
 *                     example: "+573001234567"
 *       500:
 *         description: Error al obtener la lista de sujetos
 */
router.get('/', verifyToken, getSubjectList);


/**
 * @swagger
 * /api/v1/subjects/{subjectId}:
 *   get:
 *     summary: Obtener un sujeto por ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sujeto
 *     responses:
 *       200:
 *         description: Datos del sujeto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subjectName:
 *                   type: string
 *                   description: Nombre del sujeto
 *                   example: Juan Pérez
 *                 subjectToken:
 *                   type: string
 *                   description: Token del sujeto
 *                   example: abc123token
 *                 subjectEmail:
 *                   type: string
 *                   description: Correo del sujeto
 *                   example: juan@example.com
 *                 subjectMobile:
 *                   type: string
 *                   description: Número de celular
 *                   example: "+573001234567"
 *       404:
 *         description: Sujeto no encontrado
 *       500:
 *         description: Error interno al obtener los datos del sujeto
 */
router.get('/:subjectId', verifyToken, getSubjectId);


/**
 * @swagger
 * /api/v1/subjects:
 *   post:
 *     summary: Crear un nuevo sujeto
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subjectName
 *             properties:
 *               subjectName:
 *                 type: string
 *                 description: Nombre del sujeto
 *                 example: Juan Pérez
 *               subjectToken:
 *                 type: string
 *                 description: Token opcional del sujeto
 *                 example: abc123token
 *               subjectEmail:
 *                 type: string
 *                 description: Email del sujeto
 *                 example: juan@example.com
 *               subjectMobile:
 *                 type: string
 *                 description: Número de celular del sujeto
 *                 example: "+573001234567"
 *     responses:
 *       201:
 *         description: Sujeto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sujeto creado exitosamente
 *                 subjectId:
 *                   type: string
 *                   example: 605c72ef153207001f01b62
 *       400:
 *         description: Faltan parámetros requeridos
 *       500:
 *         description: Error interno al crear sujeto
 */
router.post('/', verifyToken, createSubject);

module.exports = router;

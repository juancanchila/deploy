const express = require('express');
const router = express.Router();
const {
    getQueue,getQueueCreated,
    deleteExamFromQueue,
    getExamByqueueId,
} = require('../controllers/examController');

/**
 * @swagger
 * tags:
 *   name: Queue
 *   description: Gestión de la cola de exámenes preparados
 */

/**
 * @swagger
 * /api/v1/queue:
 *   get:
 *     summary: Obtener la cola de exámenes preparados
 *     tags: [Queue]
 *     responses:
 *       200:
 *         description: Cola de exámenes recuperada
 *       500:
 *         description: Error al obtener la cola de exámenes
 */
router.get('/', getQueueCreated);

/**
 * @swagger
 * /api/v1/queue/{examId}:
 *   get:
 *     summary: Obtener un examen específico por ID
 *     tags: [Queue]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del examen que se desea obtener
 *     responses:
 *       200:
 *         description: Examen encontrado
 *       404:
 *         description: Examen no encontrado
 *       500:
 *         description: Error al buscar el examen
 */
router.get('/:examId', getExamByqueueId);

/**
 * @swagger
 * /api/v1/queue/{examId}:
 *   delete:
 *     summary: Eliminar un examen de la cola por ID
 *     tags: [Queue]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del examen a eliminar de la cola
 *     responses:
 *       200:
 *         description: Examen eliminado exitosamente de la cola
 *       500:
 *         description: Error al eliminar examen de la cola
 */
router.delete('/:examId', deleteExamFromQueue);

module.exports = router;

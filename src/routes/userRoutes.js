const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     OTP:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         otpCodeHash:
 *           type: string
 *         isValidated:
 *           type: boolean
 *         validatedAt:
 *           type: string
 *           format: date-time
 *         expiresAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     UserRole:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *         roleId:
 *           type: integer
 *         clientId:
 *           type: integer
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         UserRole:
 *           $ref: '#/components/schemas/UserRole'
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         parentClientId:
 *           type: integer
 *           nullable: true
 *         description:
 *           type: string
 *           nullable: true
 *         subClientLimit:
 *           type: integer
 *         phone:
 *           type: string
 *           nullable: true
 *         address:
 *           type: string
 *           nullable: true
 *         city:
 *           type: string
 *           nullable: true
 *         department:
 *           type: string
 *           nullable: true
 *         postalCode:
 *           type: string
 *           nullable: true
 *         email:
 *           type: string
 *           nullable: true
 *         branchType:
 *           type: string
 *         logo:
 *           type: string
 *           nullable: true
 *         employeeCount:
 *           type: integer
 *           nullable: true
 *         contact1Name:
 *           type: string
 *           nullable: true
 *         contact1Phone:
 *           type: string
 *           nullable: true
 *         contact2Name:
 *           type: string
 *           nullable: true
 *         contact2Phone:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         clientId:
 *           type: integer
 *         isIdentityValidated:
 *           type: boolean
 *         fullName:
 *           type: string
 *           nullable: true
 *         phone:
 *           type: string
 *           nullable: true
 *         whatsapp:
 *           type: string
 *           nullable: true
 *         jobTitle:
 *           type: string
 *           nullable: true
 *         photoUrl:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         client:
 *           $ref: '#/components/schemas/Client'
 *         roles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'
 *         otps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OTP'
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', verifyToken, getUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/:id', verifyToken, getUserById);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - clientId
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               clientId:
 *                 type: integer
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
router.post('/', verifyToken, createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               clientId:
 *                 type: integer
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */
router.put('/:id', verifyToken, updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 */
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;

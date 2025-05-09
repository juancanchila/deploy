const express = require('express');
const { login, verify, validate, resetPassword } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Iniciar sesión (siempre envía OTP)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: superadmin
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: superadmin123
 *     responses:
 *       200:
 *         description: OTP enviado y token temporal generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Código de verificación enviado al teléfono
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Usuario o contraseña incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales inválidas
 */

/**
 * @swagger
 * /api/v1/login/verify:
 *   post:
 *     summary: Verificar código OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - token
 *             properties:
 *               code:
 *                 type: string
 *                 description: Código OTP recibido
 *                 example: 123456
 *               token:
 *                 type: string
 *                 description: Token temporal recibido del login
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Verificación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Verificación exitosa
 *                 username:
 *                   type: string
 *                   example: superadmin
 *                 userid:
 *                   type: integer
 *                   example: 1
 *                 role:
 *                   type: array
 *                   description: Roles del usuario
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: ADMIN
 *                 isVerified:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: Token de sesión
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Código incorrecto o usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Código incorrecto
 */

/**
 * @swagger
 * /api/v1/validate:
 *   post:
 *     summary: Validar token de sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de sesión JWT
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token válido
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: superadmin
 *                     phoneNumber:
 *                       type: string
 *                       example: +573001234567
 *                     verified:
 *                       type: boolean
 *                       example: true
 *       401:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token inválido o expirado
 *       400:
 *         description: Token no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token requerido
 */
/**
 * @swagger
 * /api/v1/reset-password:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña (envía OTP al teléfono vinculado)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *     responses:
 *       200:
 *         description: Código de verificación enviado al teléfono y token temporal generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Código de verificación enviado al teléfono
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: integer
 *                 role:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: El correo no está registrado
 *       500:
 *         description: Error al procesar la solicitud
 */

// Rutas
router.post('/', login);
router.post('/verify', verify);
router.post('/validate', validate);
router.post('/reset-password', resetPassword);
module.exports = router;

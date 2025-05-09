const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const { Op } = require('sequelize');
const { User, UserOTP ,UserLoginAttempt ,VerificationAttempt } = require('../../models');
const bcrypt = require('bcrypt');
const { getUserRole } = require('../services/userService');
require('dotenv').config();

// Twilio config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);
const protegerVerificacion = false; 
// Login: Siempre manda OTP y devuelve token de 5 minutos
 // 🔒 Cambia esto a false para desactivar la lógica de protección de reintentos

const login = async (req, res) => {
    const { username, password } = req.body;

   
 
    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // ✅ Solo ejecuta la validación si la variable está en true
        if (protegerVerificacion ) {
            const lastAttempt = await UserLoginAttempt.findOne({
                where: {
                    userId: user.id,
                    createdAt: {
                        [Op.gt]: new Date(Date.now() - 15 * 60 * 1000) // últimos 15 minutos
                    }
                },
                order: [['createdAt', 'DESC']]
            });

            if (lastAttempt) {
                const minutosRestantes = Math.ceil(
                    (15 * 60 * 1000 - (Date.now() - new Date(lastAttempt.createdAt))) / 60000
                );
                return res.status(429).json({
                    message: `Ya se envió un código recientemente. Intenta nuevamente en ${minutosRestantes} minutos.`
                });
            }
               // ✅ Siempre registra intento de login (opcional: condicionar si solo se quiere con validarReintento)
        await UserLoginAttempt.create({
            userId: user.id,
            phone: user.phone,
            lastLoginAt: new Date()
        });
        }

     

        // ✅ Solo envía el OTP si la variable está en true
        if (protegerVerificacion) {
            await client.verify.services(verifyServiceSid)
                .verifications.create({ to: '+57' + user.phone, channel: 'sms' });
        }

        // 🔐 Token temporal de 5 minutos
        const tempToken = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '5m' }
        );

        // 🎭 Obtener rol del usuario
        const roleName = await getUserRole(user.id);

        return res.status(200).json({
            message: protegerVerificacion
                ? 'Código de verificación enviado al teléfono'
                : 'Login exitoso sin validación de reintento',
            token: tempToken,
            userId: user.id,
            role: roleName
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};


// Verificar código y emitir token completo
const verify = async (req, res) => {
    const { code, token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { username: decoded.username } });

        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

        // Si la protección está activada
        if (protegerVerificacion) {
            // Revisar si ya fue verificado con ese código
            const verificado = await VerificationAttempt.findOne({
                where: {
                    userId: user.id,
                    code,
                    wasVerified: true
                }
            });

            if (verificado) {
                return res.status(400).json({
                    message: 'Este código ya fue verificado previamente.',
                    userId: user.id,
                    phone: user.phone.slice(-4),
                    code: code,
                    verifiedAt: verificado.attemptedAt
                });
            }

            // Revisar si ya intentó enviar hace menos de 1 hora
            const ultima = await VerificationAttempt.findOne({
                where: {
                    userId: user.id,
                    createdAt: {
                        [Op.gt]: new Date(Date.now() - 60 * 60 * 1000)
                    }
                },
                order: [['createdAt', 'DESC']]
            });

            if (ultima && !ultima.wasVerified) {
                return res.status(429).json({
                    message: 'Ya se envió un código recientemente. Intenta de nuevo en unos minutos.',
                    nextAllowed: new Date(ultima.createdAt.getTime() + 60 * 60 * 1000)
                });
            }

            // Validar con Twilio (si protección activa)
            const verification = await client.verify
                .services(verifyServiceSid)
                .verificationChecks.create({
                    to: '+57' + user.phone,
                    code
                });

            if (verification.status !== 'approved') {
                await VerificationAttempt.create({
                    userId: user.id,
                    phone: user.phone,
                    code,
                    wasVerified: false
                });
                return res.status(401).json({ message: 'Código incorrecto' });
            }

            // Guardar intento exitoso
            await VerificationAttempt.create({
                userId: user.id,
                phone: user.phone,
                code,
                wasVerified: true
            });
        }

        // Generar token completo
        const roleName = await getUserRole(user.id);
        const accessToken = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Verificación exitosa',
            username: user.username,
            userid: user.id,
            role: roleName,
            isVerified: true,
            token: accessToken
        });

    } catch (error) {
        console.error('Error en verificación:', error.message);
        res.status(400).json({ message: 'Código o token inválido' });
    }
};

// Validar token
const validate = async (req, res) => {
    const { token } = req.body;

    if (!token) return res.status(400).json({ message: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { username: decoded.username } });

        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

        res.status(200).json({
            message: 'Token válido',
            user: {
                username: user.username,
                phoneNumber: '+57' + user.phone
            }
        });
    } catch (error) {
        console.error('Token inválido o expirado:', error.message);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};



const resetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'El correo no está registrado' });
        }

        // Si la protección está activada, verificamos intentos recientes
        if (protegerVerificacion) {
            const lastAttempt = await PasswordResetAttempt.findOne({
                where: {
                    userId: user.id,
                    createdAt: {
                        [Op.gt]: new Date(Date.now() - 15 * 60 * 1000) // últimos 15 minutos
                    }
                },
                order: [['createdAt', 'DESC']]
            });

            if (lastAttempt) {
                const minutosRestantes = Math.ceil(
                    (15 * 60 * 1000 - (Date.now() - new Date(lastAttempt.createdAt))) / 60000
                );
                return res.status(429).json({
                    message: `Ya se solicitó un código recientemente. Intenta nuevamente en ${minutosRestantes} minutos.`
                });
            }

            // Registrar intento
            await PasswordResetAttempt.create({
                userId: user.id,
                phone: user.phone,
                attemptedAt: new Date()
            });

            // Enviar SMS (si se desea)
            await client.verify.services(verifyServiceSid)
                .verifications.create({ to: '+57' + user.phone, channel: 'sms' });
        }

        // Generar token temporal de 5 minutos
        const tempToken = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '5m' }
        );

        const roleName = await getUserRole(user.id);

        res.status(200).json({
            message: protegerVerificacion
                ? 'Código de verificación enviado al teléfono'
                : 'Token generado (modo libre)',
            token: tempToken,
            userId: user.id,
            phone_last4: user.phone.slice(-4),
            role: roleName
        });

    } catch (error) {
        console.error('Error en reset-password:', error.message);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};


module.exports = { login, verify, validate, resetPassword };



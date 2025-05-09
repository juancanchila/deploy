// src/data/users.js

module.exports = {
    users: [
        {
            username: "admin",
            password: "admin", // Contraseña fija de ejemplo
            code: "1234", // Código de verificación fijo
            phoneNumber: '+573150416295', // Este sería el teléfono real de un usuario,
            verified : true
        }
    ],
    jwtSecret: "secretoSuperSeguro" // Llave secreta para el JWT
};

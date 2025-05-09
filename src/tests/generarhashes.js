const bcrypt = require('bcrypt');

// Contraseña a hashear
const password = '12345678';

const generateHash = async () => {
    const hash = await bcrypt.hash(password, 10);  // 10 es el número de salt rounds
    console.log('Hash de la contraseña "12345678":', hash);
};

generateHash();

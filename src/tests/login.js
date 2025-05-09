const axios = require('axios');

const username = 'superadmin';  // Nombre de usuario
const password = 'superadmin123';    // Contraseña en texto claro

const apiUrl = 'http://localhost:3000/api/v1/login';

const login = async () => {
    try {
        // Enviar los datos de login al backend
        const response = await axios.post(apiUrl, { username, password });

        if (response.status === 200) {
            console.log('Login exitoso:');
            console.log('Mensaje:', response.data.message);
            console.log('Token:', response.data.token);
        } else {
            console.log('Error en el login:', response.data.message);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error.response ? error.response.data : error.message);
    }
};

login();

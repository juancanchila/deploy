// src/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const licenciaRoutes = require('./routes/licenciaRoutes');
const assignlicenciaRoutes = require('./routes/assignlicenciaRoutes');
const inputRoutes = require('./routes/inputRoutes');
const centroRoutes = require('./routes/centroRoutes');
const areaRoutes = require('./routes/areaRoutes');
const translateRoutes = require('./routes/translateRoute');
const examRoutes = require('./routes/examRoutes');
const queueRoutes = require('./routes/queueRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const logsRoutes = require('./routes/logsRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const helloRoutes = require('./routes/helloRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const roleRoutes = require('./routes/roleRoutes');
const listRoutes = require('./routes/listRoutes');
const resultsRoutes = require('./routes/resultsRoutes');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentación de la API",
            version: "1.0.0",
            description: "API con Node, Express y Swagger",
        },
        servers: [
            {
                url: "http://161.35.233.204:3000",
            }
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api/v1/hello', helloRoutes);
app.use('/api/v1/login', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/exams', examRoutes);
app.use('/api/v1/cost', centroRoutes);  // Aquí está la ruta correcta
app.use('/api/v1/areas', areaRoutes);
app.use('/api/v1/queue', queueRoutes);
app.use('/api/v1/subjects', subjectRoutes);
app.use('/api/v1/catalog', catalogRoutes);
app.use('/api/v1/logs', logsRoutes);
app.use('/api/v1/input', inputRoutes);
app.use('/api/v1/licenses', licenciaRoutes);
app.use('/api/v1/assignlicenses', assignlicenciaRoutes);
app.use('/api/v1/getCatalogListExam', listRoutes);
app.use('/api/v1/results', resultsRoutes);
// Translate
app.use('/api/v1/translate', translateRoutes);

module.exports = app;

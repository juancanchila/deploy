const axios = require('axios');
const { Translate, User, Log, Client, Exam, ExamSubject, Subject } = require("../../models");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const api_key = process.env.APY_KEY;
const { Op } = require('sequelize');
// Cabeceras comunes definidas una sola vez
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${api_key}`,
    'Content-Type': 'application/json',
};

//Create 
/**
 * 
{
  "subjectId": "abc123",
  "templateId": "template789",
  "templateInput": {
    "siteName": "Site 1",
    "location": "Main Branch"
  }
}
 */

function getAllClientDescendants(clientId, clients, result = new Set()) {
    const queue = [clientId];

    while (queue.length > 0) {
        const currentId = queue.shift();
        const children = clients.filter(c => c.parentClientId === currentId);

        for (const child of children) {
            if (!result.has(child.id)) {
                result.add(child.id);
                queue.push(child.id);
            }
        }
    }

    return Array.from(result);
}

const getLogs = async (req, res) => {
    
  
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'No se proporcionó token' });

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar al usuario que hizo la solicitud
        const currentUser = await User.findOne({ where: { username: decoded.username } });

        if (!currentUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

   
        // Obtener todos los clientes
        const allClients = await Client.findAll();

        // Obtener hijos del cliente
        const descendantClientIds = getAllClientDescendants(currentUser.clientId, allClients);
        descendantClientIds.push(currentUser.clientId); // Agregamos el cliente propio

   
        // Obtener todos los logs
        const allLogs = await Log.findAll();

        const filteredLogs = [];

        for (const log of allLogs) {
            // Buscar el usuario que generó cada log
            const logUser = await User.findByPk(log.userId);

            if (logUser) {
                // Verificar si el cliente de ese usuario está en la lista
                if (descendantClientIds.includes(logUser.clientId)) {
                    filteredLogs.push(log);
                }
            }
        }
    
        res.status(200).json(filteredLogs);
    } catch (error) {
        console.error('Error al obtener los logs:', error);
        res.status(500).json({ message: 'Error al obtener los logs', error });
    }
};

const createExamFromTemplate = async (req, res) => {
    const url = 'https://secure.converus.net/api/VerifEye/template/input';
    const { subjectId, templateId, templateInput } = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { username: decoded.username } });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        console.log('Usuario que creó el examen:', user.username);

        // 📌 Obtener el clientId desde el modelo Exam
        const exam = await Exam.findOne({ where: { templateId } });
        if (!exam) {
            return res.status(404).json({ message: 'Template no encontrado en modelo Exam' });
        }

        const payload = { subjectId, templateId, templateInput };
        const response = await axios.post(url, payload, { headers });

        console.log('Examen Asignado:', response.data);

        await Log.create({
            userId: user.id,
            clientId: user.clientId,
            accion: 'POST',
            objectId: response.data.examId,
            objectType: 'Examen'
        });

        const examId = response.data.examId;
        const response2 = await axios.get(`https://secure.converus.net/api/VerifEye/queue/${examId}`, { headers });
        const examDetails = response2.data;

console.log(examDetails,"Resumen");
        // 📌 Guardar el exam subject con el clientId sacado del modelo Exam
        await ExamSubject.create({
            subjectId: examDetails.subjectId,
            examId: examDetails.examId,
            examUrl: examDetails.examUrl,
            templateId: examDetails.templateId,
            customerId: examDetails.customerId,
            examLocale: examDetails.examLocale,
            examQueued: examDetails.examQueued,
            examStatus: examDetails.examStatus,
            examStep: examDetails.examStep,
            clientId: exam.clientId // ← aquí se guarda el clientId desde Exam
        });

        res.status(201).json({
            message: 'Examen asignado exitosamente',
            examId: response.data.examId,
            examURL: response.data.examURL,
            createdBy: user.username
        });

    } catch (error) {
        console.error('Error al asignar el examen:', error.message);
        res.status(500).json({ message: 'Error al asignar el examen' });
    }
};


//GET and DELETE from de queue
const deleteExamFromQueue = async (req, res) => {
    const { examId } = req.params;
    const url = `https://secure.converus.net/api/VerifEye/queue/${examId}`;

    // 📌 1. Extraer y verificar token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        // 📌 2. Decodificar token y buscar usuario
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { username: decoded.username } });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // 📌 3. Eliminar examen de la cola
        const response = await axios.delete(url, { headers });
        console.log('Examen eliminado de la cola:', response.data);

        // 📌 4. Crear log de eliminación
        await Log.create({
            userId: user.id,
            clientId: user.clientId,
            accion: 'DELETE',
            objectId: examId,
            objectType: 'Examen'
        });

        // 📌 5. Responder al cliente
        res.status(200).json({ message: 'Examen eliminado exitosamente', data: response.data });
    } catch (error) {
        console.error('Error al eliminar el examen de la cola:', error.message);
        res.status(500).json({ message: 'Error al eliminar el examen de la cola' });
    }
};


//List all prepared tests

const getQueue = async (req, res) => {
    const url = 'https://secure.converus.net/api/VerifEye/queue';

    try {
        const response = await axios.get(url, { headers });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener exámenes:', error.message);
        res.status(500).json({ message: 'Error al obtener la lista de exámenes' });
    }
};

const getQueueCreated = async (req, res) => {
    console.log("Obteniendo lista de exámenes permitidos");

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'No se proporcionó token' });

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findOne({ where: { username: decoded.username } });
        if (!currentUser || !currentUser.clientId)
            return res.status(404).json({ message: 'Usuario no tiene cliente asignado' });

        const allClients = await Client.findAll();
        const descendantClientIds = getAllClientDescendants(currentUser.clientId, allClients);
        descendantClientIds.push(currentUser.clientId); // incluir el mismo

        // Obtener los exámenes de los clientes permitidos
        const exams = await ExamSubject.findAll({
            where: { clientId: descendantClientIds },
            order: [['createdAt', 'DESC']],
        });

        if (exams.length === 0) {
            return res.status(404).json({ message: 'No hay exámenes creados para este cliente o sus descendientes' });
        }

        // Obtener subjectIds únicos
        const subjectIds = [...new Set(exams.map(exam => exam.subjectId))];

        // Obtener subjects relacionados
        const subjects = await Subject.findAll({
            where: { subjectId: subjectIds }
        });

        // Obtener clientIds únicos
        const clientIds = [...new Set(exams.map(ExamSubject => ExamSubject.clientId))];

        console.log(clientIds,"Clientes");
        // Obtener clientes para los nombres
        const numericClientIds = clientIds.map(id => Number(id));
        const clients = await Client.findAll({
            where: { id: numericClientIds }
        });

        // Combinar información
        const fullData = exams.map(exam => {
            const subject = subjects.find(s => s.subjectId === exam.subjectId);
            const clientId = parseInt(exam.clientId); // Convertir a número
            const client = clients.find(c => c.id === clientId); // Buscar por ID numérico

            return {
                ...exam.toJSON(),
                subjectName: subject?.subjectName || null,
                subjectToken: subject?.subjectToken || null,
                subjectEmail: subject?.subjectEmail || null,
                subjectMobile: subject?.subjectMobile || null,
                areaId: subject?.areaId || null,
                clientName: client?.name || null,
            };
        });

        res.status(200).json(fullData);
    } catch (error) {
        console.error('Error al obtener exámenes:', error.message);
        res.status(500).json({ message: 'Error interno al obtener los exámenes' });
    }
};





const getExamList = async (req, res) => {
    const url = 'https://secure.converus.net/api/VerifEye/repository/';

    try {
        // Paso 1: Verificar token y obtener usuario actual
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'No se proporcionó token' });

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findOne({ where: { username: decoded.username } });
        if (!currentUser || !currentUser.clientId) {
            return res.status(404).json({ message: 'Usuario no tiene cliente asignado' });
        }

        // Paso 2: Obtener clientes permitidos (descendientes + él mismo)
        const allClients = await Client.findAll();
        const descendantClientIds = getAllClientDescendants(currentUser.clientId, allClients);
        descendantClientIds.push(currentUser.clientId); // incluir el suyo

        // Paso 3: Llamar a la API externa
        const response = await axios.get(url, { headers });
        const apiExams = response.data;

        if (!Array.isArray(apiExams) || apiExams.length === 0) {
            return res.status(404).json({ message: 'No se encontraron exámenes en la API' });
        }

        // Paso 4: Obtener subjectIds únicos desde la API
        const subjectIdsFromAPI = [...new Set(apiExams.map(exam => exam.subjectId))];

        // Paso 5: Buscar los Subjects en la base de datos que tengan esos IDs
        const localSubjects = await Subject.findAll({
            where: { subjectId: subjectIdsFromAPI }
        });

        // Paso 6: Filtrar los subjects que están en los clientes permitidos
        const allowedSubjects = localSubjects.filter(subject =>
            descendantClientIds.includes(subject.clientId)
        );

        if (allowedSubjects.length === 0) {
            return res.status(403).json({ message: 'No hay sujetos permitidos para este usuario' });
        }

        // Paso 7: Obtener clientIds únicos de los subjects permitidos
        const allowedClientIds = [...new Set(allowedSubjects.map(s => s.clientId))];

        // Paso 8: Obtener clientes para obtener sus nombres
        const clients = await Client.findAll({
            where: { id: allowedClientIds }
        });

        // Paso 9: Unir datos: exam API + subject + nombre del cliente + campos adicionales
        const fullData = apiExams
            .filter(exam =>
                allowedSubjects.some(subject => subject.subjectId === exam.subjectId)
            )
            .map(exam => {
                const subject = allowedSubjects.find(s => s.subjectId === exam.subjectId);
                const client = clients.find(c => c.id === subject.clientId);
                const score1 = Math.round(parseFloat(exam.examScore1) * 100);
                const score2 = Math.round(parseFloat(exam.examScore2) * 100);
                const score3 = Math.round(parseFloat(exam.examScore3) * 100);
                const score4 = Math.round(parseFloat(exam.examScore4) * 100);
    
                const allScores = [score1, score2, score3, score4];
                const confiable = allScores.every(score => score >= 50);

                return {
                    ...exam,
                    subjectName: subject?.subjectName || null,
                    subjectEmail: subject?.subjectEmail || null,
                    subjectMobile: subject?.subjectMobile || null,
                    subjectCreated: subject?.subjectCreated || null,
                    subjectModified: subject?.subjectModified || null,
                    subjectToken: subject?.subjectToken || null,
                    areaId: subject?.areaId || null,
                    clientId: subject?.clientId,
                    clientName: client?.name || null,

                    // Campos adicionales personalizados
                    cluco: subject?.subjectName || null,
                    resultado: confiable ? 'Confiable' : 'No confiable',
                    color: confiable ? 'green' : 'orange'
                };
            });

        res.status(200).json(fullData);
    } catch (error) {
        console.error('Error al obtener exámenes:', error.message);
        res.status(500).json({ message: 'Error interno al obtener los exámenes' });
    }
};



const getSubjectExamData = async (req, res) => {
    const { cedula } = req.params; // La cédula viene por la URL
    const url = 'https://secure.converus.net/api/VerifEye/repository/';

    try {
        // Paso 1: Buscar el sujeto por subjectToken (cedula)
        const subject = await Subject.findOne({ where: { subjectToken: cedula } });

        if (!subject) {
            return res.status(404).json({ message: 'Sujeto no encontrado' });
        }

        // Paso 2: Consultar los datos de la API
        const apiResponse = await axios.get(url, { headers });
        const apiData = apiResponse.data;

        // Paso 3: Filtrar los exámenes que coincidan con el subjectId del sujeto
        const matchedExams = apiData.filter(exam => exam.subjectId === subject.subjectId);

        // Paso 4: Combinar datos
        const results = matchedExams.map(exam => {
            const score1 = Math.round(parseFloat(exam.examScore1) * 100);
            const score2 = Math.round(parseFloat(exam.examScore2) * 100);
            const score3 = Math.round(parseFloat(exam.examScore3) * 100);
            const score4 = Math.round(parseFloat(exam.examScore4) * 100);

            const allScores = [score1, score2, score3, score4];
            const confiable = allScores.every(score => score >= 50);

            return {
                subject: {
                    subjectId: subject.subjectId,
                    subjectName: subject.subjectName,
                    subjectEmail: subject.subjectEmail,
                    subjectMobile: subject.subjectMobile,
                    subjectToken: subject.subjectToken,
                    clientId: subject.clientId,
                    areaId: subject.areaId
                },
                examData: {
                    ...exam,
                    examScore1: score1,
                    examScore2: score2,
                    examScore3: score3,
                    examScore4: score4,
                    resultado: confiable ? 'Confiable' : 'No confiable',
                    color: confiable ? 'green' : 'orange'
                }
            };
        });

        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron exámenes para este sujeto en la API' });
        }

        res.status(200).json(results);

    } catch (error) {
        console.error('Error al obtener datos:', error.message);
        res.status(500).json({ message: 'Error interno al obtener los datos' });
    }
};

const createExam = async (req, res) => {
    const { tipoDePrueba, clientId, userId, areaId, templateId, examLocale } = req.body;

    const url = `https://secure.converus.net/api/VerifEye/catalog`;
    const payload = {
        templateId: templateId,
        localeId: examLocale,
    };

    try {
        const response = await axios.post(url, payload, { headers });

        const externalExamId = response.data;
        if (!externalExamId || typeof externalExamId !== "string") {
            return res
                .status(500)
                .json({ message: "ID inválido devuelto por la API externa." });
        }



        // ✅ Crear log
        await Log.create({
            userId: userId,
            clientId: clientId,
            accion: 'POST',
            objectId: externalExamId, // usa el ID real si está disponible
            objectType: 'Examen'
        });

        const newExam = await Exam.create({
            templateId: externalExamId,
            tipoDePrueba,
            clientId,
            userId,
            areaId: areaId || null,
        });

        const payload2 = {
            updateType: "metadata",
            templateId: externalExamId,
            examName: tipoDePrueba,
            examTopicR1: "Exam Topic 1",
            examTopicR2: "Exam Topic 2",
            examTopicR3: "Exam Topic 3",
            examTopicR4: "Exam Topic 4",
        };

        console.log(payload);

        const response2 = await axios.post(url, payload2, { headers });


        console.log("Datos recibidos de la API:", response2.data);

        return res.status(201).json({
            message: "Examen creado exitosamente",
            exam: newExam,
        });
    } catch (error) {
        console.error("Error al obtener el examen:", error.message);
        return res.status(500).json({ message: "Error al obtener el examen" });
    }
};


const getCatalogId = async (req, res) => {
    const { CatalogId } = req.params;
    const url = `https://secure.converus.net/api/VerifEye/catalog/${CatalogId}`;

    try {
        const response = await axios.get(url, { headers });
        console.log('Datos recibidos de la API:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener el examen:', error.message);
        res.status(500).json({ message: 'Error al obtener el examen' });
    }
};



const createSubject = async (req, res) => {
    const { subjectName, subjectToken, subjectEmail, subjectMobile } = req.body;

    if (!subjectName) {
        return res.status(400).json({ message: 'El campo subjectName es requerido.' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { username: decoded.username } });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const payload = {
            subjectName:subjectName.subjectName,
            subjectToken: subjectName.subjectToken,
            subjectEmail: subjectName.subjectEmail,
            subjectMobile: subjectName.subjectMobile,
        };

        console.log(payload.subjectName, 'Sent to create');

        const response = await axios.post(
            'https://secure.converus.net/api/VerifEye/subject',
            payload,{ headers }
        );

        console.log('Sujeto creado:', response.data);

        await Subject.create({
            subjectName: payload.subjectName,
            subjectToken: payload.subjectToken,
            subjectEmail: payload.subjectEmail,
            subjectMobile: payload.subjectMobile,
            subjectId: response.data.subjectId,
            clientId: user.clientId,
            areaId: user.areaId || 0  // Si no existe areaId, asignamos 0
        });


        // ✅ Crear log
        await Log.create({
            userId: user.id,
            clientId: user.clientId,
            accion: 'POST',
            objectId: response.data.subjectId, // usa el ID real si está disponible
            objectType: 'Evaluado'
        });

        res.status(201).json({
            message: 'Sujeto creado exitosamente',
            data: response.data
        });
    } catch (error) {
        console.error('Error al crear sujeto:', error.message);
        res.status(500).json({ message: 'Error al crear el sujeto' });
    }
};

const getSubjectId = async (req, res) => {
    const { subjectId } = req.params;
    const url = `https://secure.converus.net/api/VerifEye/subject/${subjectId}`;

    try {
        const response = await axios.get(url, { headers });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener el examen:', error.message);
        res.status(500).json({ message: 'Error al obtener el examen' });
    }
};

const getExamById = async (req, res) => {
    const { examId } = req.params;
    const url = `https://secure.converus.net/api/VerifEye/repository/${examId}`;

    try {
        const response = await axios.get(url, { headers });
        console.log('Datos recibidos de la API:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener el examen:', error.message);
        res.status(500).json({ message: 'Error al obtener el examen' });
    }
};

const getExamByqueueId = async (req, res) => {
    const { examId } = req.params;
    const url = `https://secure.converus.net/api/VerifEye/queue/${examId}`;

    try {
        const response = await axios.get(url, { headers });
        console.log('Datos recibidos de la API:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener el examen:', error.message);
        res.status(500).json({ message: 'Error al obtener el examen' });
    }
};

const getExamQuestionsById = async (req, res) => {
    const { templateId, examId } = req.params;
    const url = `https://secure.converus.net/api/VerifEye/exam/questions/${templateId}/${examId}`;

    try {
        const response = await axios.get(url, { headers });
        console.log('Preguntas del examen recibidas:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener las preguntas del examen:', error.message);
        res.status(500).json({ message: 'Error al obtener las preguntas del examen' });
    }
};

const getExamAnswer = async (req, res) => {
    const { examId } = req.params;
    const url = `https://secure.converus.net/api/VerifEye/exam/answers/${examId}`;

    try {
        const response = await axios.get(url, { headers });
        console.log('Datos recibidos de la API:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener el examen:', error.message);
        res.status(500).json({ message: 'Error al obtener el examen' });
    }
};

const getExamAnswerById = async (req, res) => {
    const { examId } = req.params;
    const url = `https://secure.converus.net/api/VerifEye/exam/answerDetails/${examId}`;

    try {
        const response = await axios.get(url, { headers });
        console.log('Datos recibidos de la API:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener el examen:', error.message);
        res.status(500).json({ message: 'Error al obtener el examen' });
    }
};

// Nueva función para obtener la lista de sujetos
/*
const getSubjectList = async (req, res) => {
    const url = 'https://secure.converus.net/api/VerifEye/subject';

    try {
        const response = await axios.get(url, { headers });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener sujetos:', error.message);
        res.status(500).json({ message: 'Error al obtener la lista de sujetos' });
    }
};



*/
const getSubjectList = async (req, res) => {
    const url = 'https://secure.converus.net/api/VerifEye/subject';

    console.log("list of subjects");

    try {
        // Paso 1: Verificar y decodificar token
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'No se proporcionó token' });

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findOne({ where: { username: decoded.username } });

        if (!currentUser || !currentUser.clientId)
            return res.status(404).json({ message: 'Usuario no tiene cliente asignado' });

        // Paso 2: Obtener clientes hijos (descendientes)
        const allClients = await Client.findAll();
        const descendantClientIds = getAllClientDescendants(currentUser.clientId, allClients);
        descendantClientIds.push(currentUser.clientId); // incluir el mismo

        console.log(allClients);

        // Paso 3: Hacer la consulta a la API externa
        const response = await axios.get(url, { headers });

        // Paso 4: Obtener subjectIds de la API
        const subjectIdsFromAPI = response.data.map(item => item.subjectId);

        // Paso 5: Buscar en base de datos local los Subjects por subjectId
        const localSubjects = await Subject.findAll({
            where: { subjectId: subjectIdsFromAPI }
        });

        // Paso 6: Filtrar los que pertenecen a los clientes permitidos
        const allowedSubjects = localSubjects.filter(subject =>
            descendantClientIds.includes(subject.clientId)
        );

        // Paso 7: Filtrar la data de la API para que solo queden los sujetos permitidos
        const filteredSubjects = response.data.filter(item =>
            allowedSubjects.some(local => local.subjectId === item.subjectId)
        );

        // Paso 8: Agregar la información adicional de la base de datos a los sujetos seleccionados
        const subjectsWithAdditionalInfo = filteredSubjects.map(subjectFromAPI => {
            const subjectFromDB = allowedSubjects.find(localSubject => localSubject.subjectId === subjectFromAPI.subjectId);
            return {
                ...subjectFromAPI, // Información de la API
                subjectName: subjectFromDB.subjectName,
                subjectEmail: subjectFromDB.subjectEmail,
                subjectMobile: subjectFromDB.subjectMobile,
                subjectCreated: subjectFromDB.subjectCreated,
                subjectModified: subjectFromDB.subjectModified,
                // Agregar más campos de la base de datos si es necesario
                clientId: subjectFromDB.clientId, // Campo clientId de la base de datos
                areaId: subjectFromDB.areaId, // Campo areaId de la base de datos
            };
        });

        // Paso 9: Retornar los datos permitidos con la información adicional
        res.status(200).json(subjectsWithAdditionalInfo);
    } catch (error) {
        console.error('Error al obtener sujetos:', error.message);
        res.status(500).json({ message: 'Error al obtener la lista de sujetos' });
    }
};


// Nueva función para obtener la lista de catalogos

const getCatalogList = async (req, res) => {
    const url = "https://secure.converus.net/api/VerifEye/catalog";

    try {
        const response = await axios.get(url, { headers });
        const catalogData = response.data;

        // Obtener todas las traducciones existentes
        const translations = await Translate.findAll();

        // Crear mapa con original como clave y objeto { translated, id } como valor
        const translationMap = {};
        translations.forEach((t) => {
            translationMap[t.original] = {
                translated: t.translated,
                id: t.id
            };
        });

        // Reemplazar examName, agregar translationId y original si existe traducción
        const processedCatalog = catalogData.map((item) => {
            const match = translationMap[item.examName];
            return {
                ...item,
                examName: match ? match.translated : item.examName,
                translationId: match ? match.id : null,
                original: item.examName // ← agregamos el texto original aquí
            };
        });

        console.log("Catálogo traducido:", processedCatalog);
        res.status(200).json(processedCatalog);
    } catch (error) {
        console.error("Error al obtener sujetos:", error.message);
        res.status(500).json({ message: "Error al obtener la lista de sujetos" });
    }
};



const getCatalogListExam = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'No se proporcionó token' });

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findOne({ where: { username: decoded.username } });

        if (!currentUser || !currentUser.clientId) {
            return res.status(404).json({ message: 'Usuario no tiene cliente asignado' });
        }

        // Obtener todos los clientes
        const allClients = await Client.findAll();
        const descendantClientIds = getAllClientDescendants(currentUser.clientId, allClients);
        descendantClientIds.push(currentUser.clientId); // incluir su propio clientId

        // Obtener exámenes relacionados a esos clientes
        const exams = await Exam.findAll({
            where: { clientId: descendantClientIds }
        });

        res.status(200).json(exams);
    } catch (error) {
        console.error('Error al obtener exámenes:', error);
        res.status(500).json({ message: 'Error al obtener exámenes', error });
    }
};


// Nueva función para crear múltiples sujetos desde una lista procesada
const createSubjectFromList = async (req, res) => {
    const subjectList = req.body.subjectList;

    // 📌 1. Validación de entrada
    if (!Array.isArray(subjectList) || subjectList.length === 0) {
        return res.status(400).json({ message: 'Se debe proporcionar una lista de sujetos válida.' });
    }

    // 📌 2. Extraer y verificar token JWT del header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        // 📌 3. Decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 📌 4. Buscar usuario autenticado
        const user = await User.findOne({ where: { username: decoded.username } });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        console.log('Usuario que está creando sujetos:', user.username);

        // 📌 5. Crear todos los sujetos en paralelo
        const createPromises = subjectList.map(async (subject) => {
            const { subjectName, subjectToken, subjectEmail, subjectMobile } = subject;

            if (!subjectName) {
                throw new Error('El campo subjectName es requerido.');
            }

            const payload = {
                subjectName,
                ...(subjectToken && { subjectToken }),
                ...(subjectEmail && { subjectEmail }),
                ...(subjectMobile && { subjectMobile })
            };

            // 📌 6. Enviar solicitud a Converus
            const response = await axios.post(
                'https://secure.converus.net/api/VerifEye/subject',
                payload,
                { headers }
            );

            const createdSubject = response.data;

            console.log(`✅ Sujeto "${subjectName}" creado con éxito.`);

            // 📌 7. Crear log del sujeto creado
            await Log.create({
                userId: user.id,
                clientId: user.clientId,
                accion: 'POST',
                objectId: createdSubject.subjectId,
                objectType: 'Evaluado'
            });

            return createdSubject;
        });

        const results = await Promise.all(createPromises);

        // 📌 8. Enviar respuesta
        res.status(201).json({
            message: 'Todos los sujetos fueron creados y logueados exitosamente.',
            data: results
        });
    } catch (error) {
        console.error('❌ Error al crear los sujetos:', error.message);
        res.status(500).json({ message: 'Error al crear los sujetos', error: error.message });
    }
};


module.exports = {
    createSubject,
    createSubjectFromList,
    createExamFromTemplate,
    getExamList,
    getExamById,
    getExamAnswerById,
    getExamQuestionsById,
    getExamAnswer,
    getQueue,
    deleteExamFromQueue,
    getSubjectList,
    getSubjectId,
    getCatalogList,
    getCatalogId,
    getExamByqueueId,
    getLogs,
    createExam,
    getCatalogListExam,
    getSubjectExamData,
    getQueueCreated

};
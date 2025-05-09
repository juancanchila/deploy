const { Area, Client } = require('../../models');

// Crear área asociada a un cliente
const createArea = async (req, res) => {
    const { clientId } = req.params; // El ID del cliente viene en la URL

    try {
        // Verificar que el cliente exista
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Crear el área asociada al cliente
        const area = await Area.create({
            name: req.body.name,
            description: req.body.description || null,
            clientId: clientId
        });

        res.status(201).json(area);
    } catch (error) {
        console.error('Error al crear el área:', error);
        res.status(500).json({ message: 'Error al crear el área', error: error.message });
    }
};

// Obtener todas las áreas de un cliente
const getAreas = async (req, res) => {
    const { clientId } = req.params; // El ID del cliente viene en la URL

    try {
        // Verificar que el cliente exista
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Obtener las áreas asociadas al cliente
        const areas = await Area.findAll({ where: { clientId } });
        res.status(200).json(areas);
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        res.status(500).json({ message: 'Error al obtener áreas', error: error.message });
    }
};

// Obtener un área por ID y cliente
const getAreaById = async (req, res) => {
    const { clientId, id } = req.params; // Ambos IDs vienen en la URL

    try {
        // Verificar que el cliente exista
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Obtener el área asociada al cliente
        const area = await Area.findOne({ where: { id, clientId } });
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada' });
        }
        res.status(200).json(area);
    } catch (error) {
        console.error('Error al obtener el área:', error);
        res.status(500).json({ message: 'Error al obtener el área', error: error.message });
    }
};

// Actualizar área
const updateArea = async (req, res) => {
    const { clientId, id } = req.params; // Ambos IDs vienen en la URL

    try {
        // Verificar que el cliente exista
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Obtener el área asociada al cliente
        const area = await Area.findOne({ where: { id, clientId } });
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada' });
        }

        // Actualizar el área
        await area.update({
            name: req.body.name,
            description: req.body.description || null
        });

        res.status(200).json(area);
    } catch (error) {
        console.error('Error al actualizar el área:', error);
        res.status(500).json({ message: 'Error al actualizar el área', error: error.message });
    }
};

// Eliminar área
const deleteArea = async (req, res) => {
    const { clientId, id } = req.params; // Ambos IDs vienen en la URL

    try {
        // Verificar que el cliente exista
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Obtener el área asociada al cliente
        const area = await Area.findOne({ where: { id, clientId } });
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada' });
        }

        // Eliminar el área
        await area.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar el área:', error);
        res.status(500).json({ message: 'Error al eliminar el área', error: error.message });
    }
};

module.exports = {
    createArea,
    getAreas,
    getAreaById,
    updateArea,
    deleteArea
};

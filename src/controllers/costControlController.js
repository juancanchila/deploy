const { CostCenter, Client } = require('../../models');

// Crear un nuevo centro de costos
const createCostCenter = async (req, res) => {
    try {
        const { clientId } = req.params;  // El clientId se obtiene de los parámetros de la URL
        let { code, description } = req.body;

        // Verificar si el cliente existe
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

        // Si no se proporciona un código, generar uno aleatorio
        if (!code) {
            const randomNumber = Math.floor(1000 + Math.random() * 9000); // Número aleatorio entre 1000 y 9999
            code = `CC-${randomNumber}`;
        }

        // Crear el centro de costos
        const newCostCenter = await CostCenter.create({
            code,
            description,
            clientId: client.id
        });

        console.log(newCostCenter);
        res.status(201).json(newCostCenter);
    } catch (error) {
        console.error('Error al crear el centro de costos:', error);
        res.status(500).json({ message: 'Error al crear el centro de costos.' });
    }
};

// Obtener todos los centros de costos de un cliente
const getCostCenters = async (req, res) => {
    try {
        const { clientId } = req.params;  // El clientId se obtiene de los parámetros de la URL

        // Verificar si el cliente existe
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

        const costCenters = await CostCenter.findAll({ where: { clientId } });
        res.status(200).json(costCenters);
    } catch (error) {
        console.error('Error al obtener los centros de costos:', error);
        res.status(500).json({ message: 'Error al obtener los centros de costos.' });
    }
};

// Obtener un centro de costos de un cliente por ID
const getCostCenterById = async (req, res) => {
    try {
        const { clientId, id } = req.params;  // Ambos parámetros se obtienen de la URL

        // Verificar si el cliente existe
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

        const costCenter = await CostCenter.findOne({
            where: { id, clientId }
        });

        if (!costCenter) {
            return res.status(404).json({ message: 'Centro de costos no encontrado.' });
        }

        res.status(200).json(costCenter);
    } catch (error) {
        console.error('Error al obtener el centro de costos:', error);
        res.status(500).json({ message: 'Error al obtener el centro de costos.' });
    }
};

// Actualizar un centro de costos de un cliente
const updateCostCenter = async (req, res) => {
    try {
        const { clientId, id } = req.params;  // Ambos parámetros se obtienen de la URL
        const { code, description } = req.body;

        // Verificar si el cliente existe
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

        const costCenter = await CostCenter.findOne({
            where: { id, clientId }
        });

        if (!costCenter) {
            return res.status(404).json({ message: 'Centro de costos no encontrado.' });
        }

        // Actualizar los campos del centro de costos
        costCenter.code = code || costCenter.code; // Si no viene, se mantiene el actual
        costCenter.description = description || costCenter.description;
        await costCenter.save();

        res.status(200).json(costCenter);
    } catch (error) {
        console.error('Error al actualizar el centro de costos:', error);
        res.status(500).json({ message: 'Error al actualizar el centro de costos.' });
    }
};

// Eliminar un centro de costos de un cliente
const deleteCostCenter = async (req, res) => {
    try {
        const { clientId, id } = req.params;  // Ambos parámetros se obtienen de la URL

        // Verificar si el cliente existe
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

        const costCenter = await CostCenter.findOne({
            where: { id, clientId }
        });

        if (!costCenter) {
            return res.status(404).json({ message: 'Centro de costos no encontrado.' });
        }

        // Eliminar el centro de costos
        await costCenter.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar el centro de costos:', error);
        res.status(500).json({ message: 'Error al eliminar el centro de costos.' });
    }
};

module.exports = {
    createCostCenter,
    getCostCenters,
    getCostCenterById,
    updateCostCenter,
    deleteCostCenter
};

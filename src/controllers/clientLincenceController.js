const { ClientLicense } = require('../../models');

// Crear licencia para un cliente
const createLicense = async (req, res) => {
    const { clientId } = req.params;
    console.log(req.body);
    try {
        const { licenseCount, startDate, expiryDate, available } = req.body;

        // Validación de campos obligatorios
        if (!clientId || !licenseCount) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        // Crear la licencia asociada al cliente
        const clientLicense = await ClientLicense.create({
            client_id: clientId,
            licenseCount,
            startDate: startDate ?? new Date(),
            expiryDate: expiryDate ?? new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            available: available ?? licenseCount
        });

        res.status(201).json(clientLicense);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la licencia', error: error.message });
    }
};

// Obtener todas las licencias de un cliente
const getLicenses = async (req, res) => {
    const { clientId } = req.params;
    try {
        // Obtener todas las licencias asociadas a un cliente
        const licenses = await ClientLicense.findAll({ where: { client_id: clientId } });
        if (licenses.length === 0) {
            return res.status(404).json({ message: 'No se encontraron licencias para este cliente' });
        }
        res.status(200).json(licenses);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener licencias', error: error.message });
    }
};

// Obtener una licencia de un cliente por ID de licencia
const getLicenseById = async (req, res) => {
    const { clientId, id } = req.params;
    try {
        // Buscar la licencia específica de un cliente por el ID de la licencia
        const license = await ClientLicense.findOne({ where: { client_id: clientId, id } });
        if (!license) {
            return res.status(404).json({ message: 'Licencia no encontrada' });
        }
        res.status(200).json(license);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la licencia', error: error.message });
    }
};

// Actualizar una licencia de un cliente
// Actualizar una licencia de un cliente
const updateLicense = async (req, res) => {
    const { clientId, id } = req.params;

    try {
        const license = await ClientLicense.findOne({ where: { client_id: clientId, id } });
        if (!license) {
            return res.status(404).json({ message: 'Licencia no encontrada' });
        }

        const { licenseCount, startDate, expiryDate, available } = req.body;

        await license.update({
            licenseCount: licenseCount ?? license.licenseCount,
            startDate: startDate ?? license.startDate,
            expiryDate: expiryDate ?? license.expiryDate,
            available: available ?? license.available
        });

        res.status(200).json(license);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la licencia', error: error.message });
    }
};
// Eliminar una licencia de un cliente
const deleteLicense = async (req, res) => {
    const { clientId, id } = req.params;

    try {
        const license = await ClientLicense.findOne({ where: { client_id: clientId, id } });
        if (!license) {
            return res.status(404).json({ message: 'Licencia no encontrada' });
        }

        await license.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la licencia', error: error.message });
    }
};

module.exports = {
    createLicense,
    getLicenses,
    getLicenseById,
    updateLicense,
    deleteLicense
};

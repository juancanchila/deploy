const { ClientLicense } = require('../../models');


// Asignar licencias de un cliente a otro
const assignLicenses = async (req, res) => {
    const { clientId, licenseId } = req.params;  // Recibimos el ID del cliente y la licencia
    const { targetClientId, licenseCount } = req.body;  // Recibimos el cliente de destino y el número de licencias

    if (!targetClientId || !licenseCount) {
        return res.status(400).json({ message: 'Faltan campos obligatorios: targetClientId o licenseCount' });
    }

    try {
        // Buscar la licencia específica del cliente origen por ID de licencia
        const sourceLicense = await ClientLicense.findOne({
            where: { client_id: clientId, id: licenseId },
        });

        if (!sourceLicense) {
            return res.status(404).json({ message: 'Licencia del cliente origen no encontrada' });
        }

        if (sourceLicense.available < licenseCount) {
            return res.status(400).json({ message: 'No hay suficientes licencias disponibles para asignar' });
        }

        // Crear nueva licencia para el cliente destino
        const newLicense = await ClientLicense.create({
            client_id: targetClientId,
            licenseCount,
            startDate: new Date(),
            expiryDate: sourceLicense.expiryDate,  // Usar la misma fecha de expiración
            available: licenseCount,
        });

        // Actualizar la licencia del cliente origen
        sourceLicense.available -= licenseCount;
        await sourceLicense.save();

        res.status(201).json({
            message: 'Licencias asignadas exitosamente',
            assigned: newLicense,
            sourceUpdated: sourceLicense
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al asignar licencias', error: error.message });
    }
};

module.exports = {
    assignLicenses
};


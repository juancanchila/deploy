const { Client, User ,UserRole} = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Obtener todos los subclientes de forma recursiva
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

// Crear cliente
const createClient = async (req, res) => {

    console.log(req.body);
    try {
        const client = await Client.create({
            name: req.body.name,
            nit: req.body.nit,
            parentClientId: req.body.parentClientId || 1,
            description: req.body.description || '',
            subClientLimit: req.body.subClientLimit || 1,
            phone: req.body.phone || '0000000000',
            address: req.body.address || 'No especificada',
            city: req.body.city || 'No especificada',
            department: req.body.department || 'No especificado',
            postalCode: req.body.postalCode || '',
            email: req.body.email,
            branchType: req.body.branchType || 'sucursal',
            logo: req.body.logo || '',
            employeeCount: req.body.employeeCount || 0,
            contact1Name: req.body.contact1Name || 'Sin nombre',
            contact1Phone: req.body.contact1Phone || '0000000000',
            contact2Name: req.body.contact2Name || '',
            contact2Phone: req.body.contact2Phone || '0000000000'
        });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente', error });
    }
};

// Obtener todos los clientes asociados al usuario actual
const getClients = async (req, res) => {
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
        descendantClientIds.push(currentUser.clientId);

        const clients = await Client.findAll({ where: { id: descendantClientIds } });
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ message: 'Error al obtener clientes', error });
    }
};

// Obtener cliente por ID
const getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cliente', error });
    }
};

// Actualizar cliente (🔧 esta parte fue corregida)
const updateClient = async (req, res) => {
    const { id } = req.params;
    const { roleId, userId } = req.body; // 👈 extraemos los valores del body

    try {
        const client = await Client.findByPk(id);
        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

        // ✅ 1. Actualizar datos del cliente
        await client.update({
            name: req.body.name,
            nit: req.body.nit ?? client.nit,
            parentClientId: req.body.parentClientId ?? client.parentClientId,
            description: req.body.description ?? client.description,
            subClientLimit: req.body.subClientLimit ?? client.subClientLimit,
            phone: req.body.phone,
            address: req.body.address ?? client.address,
            city: req.body.city ?? client.city,
            department: req.body.department ?? client.department,
            postalCode: req.body.postalCode ?? client.postalCode,
            email: req.body.email,
            branchType: req.body.branchType ?? client.branchType,
            logo: req.body.logo ?? client.logo,
            employeeCount: req.body.employeeCount ?? client.employeeCount,
            contact1Name: req.body.contact1Name ?? client.contact1Name,
            contact1Phone: req.body.contact1Phone ?? client.contact1Phone,
            contact2Name: req.body.contact2Name ?? client.contact2Name,
            contact2Phone: req.body.contact2Phone ?? client.contact2Phone,
        });

        // ✅ 2. Si vienen roleId y userId, actualizamos el rol
        if (roleId && userId) {
            // 🧹 Eliminar roles antiguos del usuario para este cliente
            await UserRole.destroy({
                where: {
                    userId,
                    clientId: client.id
                }
            });

            // ➕ Asignar nuevo rol
            await UserRole.create({
                userId,
                clientId: client.id,
                roleId
            });
        }

        res.status(200).json({ message: 'Cliente actualizado', client });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el cliente', error });
    }
};
// Eliminar cliente
const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });
        await client.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error });
    }
};

module.exports = {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
};

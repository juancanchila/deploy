// controllers/userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Client, Role, UserOTP, UserRole } = require('../../models');

/**
 * Crear un nuevo usuario con contraseña hasheada y asociación de roles.
 */
const createUser = async (req, res) => {
  const {
    username,
    email,
    password,
    telefono,
    whatsapp,
    cargo,
    foto,
    clientId,
    roleIds,
    fullName,
    city
  } = req.body;

  try {
    // 1️⃣ Validar existencia del cliente
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // 2️⃣ Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3️⃣ Crear usuario con contraseña hasheada
    const user = await User.create({
      username,
      email,
      city,
      fullName,
      password: hashedPassword,
      phone: telefono,
      whatsapp,
      jobTitle: cargo,
      photoUrl: foto,
      clientId,
      isIdentityValidated: false
    });

    // 4️⃣ Asociar roles si se proveen
    if (Array.isArray(roleIds) && roleIds.length > 0) {
      const roles = await Role.findAll({ where: { id: roleIds } });
      if (roles.length !== roleIds.length) {
        return res.status(400).json({ message: 'Uno o más roles no existen' });
      }
      const userRoleData = roles.map(role => ({
        userId: user.id,
        roleId: role.id,
        clientId
      }));
      await UserRole.bulkCreate(userRoleData);
    }

    // 5️⃣ Devolver usuario con sus relaciones
    const newUser = await User.findByPk(user.id, {
      include: [
        { model: Client, as: 'client' },
        { model: Role, as: 'roles' },
        { model: UserOTP, as: 'otps' }
      ]
    });

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: newUser
    });

  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

/**
 * Obtener todos los descendientes de un cliente usando BFS.
 */
function getAllClientDescendants(clientId, clients) {
  const result = new Set();
  const visited = new Set();
  const queue = [clientId];

  while (queue.length > 0) {
    const currentId = queue.shift();
    const children = clients.filter(c => c.parentClientId === currentId);

    for (const child of children) {
      if (!visited.has(child.id)) {
        visited.add(child.id);
        result.add(child.id);
        queue.push(child.id);
      }
    }
  }

  return Array.from(result);
}

/**
 * Obtener todos los usuarios visibles para el usuario autenticado
 */
const getUsers = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No se proporcionó token' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findOne({ where: { username: decoded.username } });

    if (!currentUser || !currentUser.clientId) {
      return res.status(404).json({ message: 'Usuario no tiene cliente asignado' });
    }

    const allClients = await Client.findAll();
    const descendantClientIds = getAllClientDescendants(currentUser.clientId, allClients);
    descendantClientIds.push(currentUser.clientId); // incluir el suyo

    const users = await User.findAll({
      where: {
        clientId: descendantClientIds
      },
      include: [
        { model: Client, as: 'client' },
        { model: Role, as: 'roles' },
        { model: UserOTP, as: 'otps' }
      ]
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

/**
 * Obtener un usuario por ID con sus relaciones.
 */
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: [
        { model: Client, as: 'client' },
        { model: Role, as: 'roles' },
        { model: UserOTP, as: 'otps' }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

/**
 * Actualizar usuario (username, email, clientId y roles).
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    email,
    password,
    fullName,
    phone,
    whatsapp,
    jobTitle,
    photoUrl,
    isIdentityValidated,
    clientId: clientIdFromBody,
    roleIds,
    city
  } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Determinar el clientId final
    let finalClientId = user.clientId;
    if (clientIdFromBody) {
      const client = await Client.findByPk(clientIdFromBody);
      if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      finalClientId = clientIdFromBody;
    }
    if (!finalClientId) {
      finalClientId = 1;
    }

    // Actualizar roles si se proporcionan
    if (Array.isArray(roleIds)) {
      const roles = await Role.findAll({ where: { id: roleIds } });
      await user.setRoles([]);
      for (const role of roles) {
        await user.addRole(role, { through: { clientId: finalClientId } });
      }
    }

    const fieldsToUpdate = {
      username,
      email,
      fullName,
      phone,
      whatsapp,
      jobTitle,
      photoUrl,
      city,
      isIdentityValidated,
      clientId: finalClientId
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fieldsToUpdate.password = hashedPassword;
    }

    await user.update(fieldsToUpdate);

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

/**
 * Eliminar usuario por ID.
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};

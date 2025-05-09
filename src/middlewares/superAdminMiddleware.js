const jwt = require('jsonwebtoken');
const { User } = require('../../models'); // Ajusta la ruta según tu estructura
const { getUserRole } = require('../services/userService');

const verifySuperAdmin = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(400).json({ message: 'Token no proporcionado' });
  }

  const tokenParts = authHeader.split(' ');
  const token = tokenParts.length === 2 ? tokenParts[1] : tokenParts[0];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

    if (!decoded?.username) {
      return res.status(401).json({ message: 'Token inválido: falta el nombre de usuario' });
    }

    // Buscar el usuario por username para obtener su ID
    const user = await User.findOne({ where: { username: decoded.username } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

  
    // Obtener rol con el ID del usuario

    const roles = await getUserRole(user.id);
    const roleName = roles?.[0]?.name;

    if (!roleName) {
      return res.status(403).json({ message: roleName.name  });
    }
    const esAdmin = roles.includes('Super Admin') || roles.includes('Admin');
 
    if (esAdmin) {
      return res.status(403).json({ message: 'Acceso restringido a usuarios Super Admin' });
    }
    console.log('🔐 Iniciando verificación de SuperAdmin');
    next();
  } catch (err) {
    console.error('Error al verificar SuperAdmin:', err.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = { verifySuperAdmin };

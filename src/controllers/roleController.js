const { Role } = require('../../models'); // Asegúrate de que esté bien la ruta

const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']]
    });

    console.log('📋 Roles obtenidos:', roles);
    res.status(200).json(roles); // <-- esta línea faltaba en tu código anterior
  } catch (error) {
    console.error('❌ Error al obtener roles:', error);
    res.status(500).json({ message: 'Error al obtener roles' });
  }
};

module.exports = {
  getRoles
};

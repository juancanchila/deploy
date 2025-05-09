const { User, Role } = require('../../models');

const getUserRole = async (userId) => {
    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Role,
            as: 'roles', // debe coincidir con el alias en User.belongsToMany
            through: { attributes: [] }, // oculta datos de la tabla intermedia
          }
        ]
      });
  
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
  
      return user.roles; // Devuelve un array de roles asociados
    } catch (error) {
      console.error('Error en getUserRole:', error);
      throw new Error('Error al obtener los roles del usuario');
    }
  };
  
  module.exports = { getUserRole };
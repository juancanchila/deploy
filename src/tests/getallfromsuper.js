const { User, Client, UserOTP, Role } = require('../../models');


(async () => {
  try {
    const user = await User.findOne({
      where: { username: 'superadmin' },
      include: [
        {
          model: Client,
          as: 'client'
        },
        {
          model: UserOTP,
          as: 'otps'
        },
        {
          model: Role,
          as: 'roles',
          through: {
            attributes: ['id', 'clientId', 'userId', 'roleId', 'createdAt', 'updatedAt'] // 🔥 Esto hace que salgan los datos de UserRole
          }
        }
      ]
    });

    console.log('✅ Usuario superadmin con relaciones cargadas:\n');
    console.dir(user.toJSON(), { depth: null });

  } catch (error) {
    console.error('🔥 Error al obtener los datos:', error);
  }
})();

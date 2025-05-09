const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      // Relación: Un cliente puede tener muchos subclientes
      Client.hasMany(models.Client, {
        foreignKey: 'parentClientId',
        as: 'subClients',
      });

      // Relación: Un cliente puede tener un cliente padre
      Client.belongsTo(models.Client, {
        foreignKey: 'parentClientId',
        as: 'parentClient',
      });

      // Relación: Un cliente puede estar asociado con un centro de costo
      Client.belongsTo(models.CostCenter, {
        foreignKey: 'costCenterId',
        as: 'costCenter',
      });

      // Relación: Un cliente puede tener muchas licencias
      Client.hasMany(models.Licencia, {
        foreignKey: 'clientId',
        as: 'licencias',
      });

      // Relación: Un cliente puede tener muchas áreas
      Client.hasMany(models.Area, {
        foreignKey: 'clientId',
        as: 'areas',
      });
    }
  }

  Client.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nit: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function(value) {
          const existingClient = await Client.findOne({ where: { nit: value } });
          if (existingClient) {
            throw new Error('El NIT ya está registrado.');
          }
        }
      }
    },
    costCenterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CostCenters',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    parentClientId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subClientLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
      validate: {
        min: 1,
        max: 10
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 10]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    branchType: {
      type: DataTypes.ENUM('principal', 'sucursal'),
      allowNull: false,
      defaultValue: 'sucursal'
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employeeCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contact1Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact1Phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 10]
      }
    },
    contact2Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contact2Phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [10, 10]
      }
    }
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'Clients',
    timestamps: true
  });

  return Client;
};

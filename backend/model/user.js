const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { hashPassword } = require('../hooks/passwordHook');


const Usuario = sequelize.define(
  'Usuario',
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O nome é obrigatório.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'O email deve ser válido.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'A senha deve ter pelo menos 6 caracteres.',
        },
      },
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'usuarios',
    schema: 'banda',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Hooks para hashing da senha
Usuario.beforeCreate(hashPassword);
Usuario.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    await hashPassword(user);
  }
});



module.exports = Usuario;

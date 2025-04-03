const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { hashPassword } = require('../hooks/passwordHook');

const Banda = sequelize.define(

  'Banda',
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    membros: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    redes_sociais: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  
  },
  {
    tableName: 'banda',
    schema: 'banda',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);


// Hooks para hashing da senha
Banda.beforeCreate(hashPassword);
Banda.beforeUpdate(async (banda) => {
  if (banda.changed('password')) {
    await hashPassword(banda);
  }
});

module.exports = Banda; 

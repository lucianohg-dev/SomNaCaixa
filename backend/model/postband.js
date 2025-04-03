const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Banda = require('./banda'); // Certifique-se de que o nome está correto

const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'banda', // Nome da tabela e não do modelo
        key: 'id',
      },
    },
  },
  {
    tableName: 'postband',
    schema: 'banda',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Definição explícita do relacionamento
Post.belongsTo(Banda, { foreignKey: 'band_id' });
Banda.hasMany(Post, { foreignKey: 'band_id' });

module.exports = Post;

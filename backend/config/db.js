const { Sequelize } = require('sequelize');

// Configuração do Sequelize para o banco de dados PostgreSQL
const sequelize = new Sequelize('SomNaCaixa', 'postgres', '403735', {
  host: 'localhost',
  dialect: 'postgres',
  schema: 'banda',
  logging: false, // Desativa logs SQL

});



module.exports = sequelize;

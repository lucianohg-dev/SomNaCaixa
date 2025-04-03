const sequelize = require('../config/db'); // Ajuste o caminho do arquivo de configuração
const Banda = require('../model/banda'); // Ajuste o caminho se necessário
const Post = require('../model/postband'); // Ajuste o caminho se necessário

const syncDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados foi bem-sucedida.');

        // Sincroniza primeiro a tabela Banda
        await Banda.sync({ force: true });
        console.log('Tabela Banda sincronizada.');

        // Depois sincroniza a tabela Post, que depende de Banda
        await Post.sync({ force: true });
        console.log('Tabela Post sincronizada.');

        console.log('Tabelas sincronizadas com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    } 
};

// syncDb();

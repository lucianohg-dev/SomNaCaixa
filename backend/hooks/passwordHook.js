const bcrypt = require('bcrypt');

// Função para hashear senha
const hashPassword = async (user) => {
  // Gera um salt aleatório para a senha
  const salt = await bcrypt.genSalt(10);

  // Aplica o salt à senha para gerar o hash
  user.password = await bcrypt.hash(user.password, salt);
};

module.exports = { hashPassword };

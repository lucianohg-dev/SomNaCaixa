const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido ou mal formatado' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido ou expirado' });
    
    req.user = user; // Salvando os dados do usuário no req, incluindo o id
    console.log('Usuário autenticado:', req.user); // Verifique o que está sendo salvo

    next();
  });
};

module.exports = authenticateToken;

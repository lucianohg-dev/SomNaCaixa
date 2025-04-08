const passport = require('passport');
const  Usuario  = require('../model/user');
const  Banda  = require('../model/banda');
const postBand = require('../model/postband')
const{ generateToken}= require ("../utils/auth");

const path = require('path');
require('dotenv').config();




// Função para criar um novo usuário
exports.createUser = async (req, res) => {
  const { nome, email, password } = req.body;

  if (!nome || !email || !password) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  if (password.length < 6 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return res.status(400).json({
      message: 'A senha deve ter pelo menos 6 caracteres, incluindo uma letra e um número.',
    });
  }

  try {
    const emailExists = await Usuario.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    await Usuario.create({ nome, email, password });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    res.status(500).json({ message: 'Erro ao processar o cadastro' });
  }
};


exports.createBand = async (req, res) => {
  try {
   
    const { nome, genero, descricao, membros, redesSociais, email, password } = req.body;

    if (!nome || !genero || !descricao || !membros || !redesSociais || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    // Validação da senha
    if (password.length < 6 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({
        message: 'A senha deve ter pelo menos 6 caracteres, incluindo uma letra e um número.',
      });
    }

    // Verifica se o email já está cadastrado
    const emailExists = await Banda.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Tratamento de membros
    const membrosArray = Array.isArray(membros) ? membros : membros.split(',').map(m => m.trim());

    // Tratamento seguro de redes sociais
    let redesSociaisArray;
    if (typeof redesSociais === 'string') {
      if (redesSociais.startsWith('{') || redesSociais.startsWith('[')) {
        try {
          redesSociaisArray = JSON.parse(redesSociais);
          if (!Array.isArray(redesSociaisArray)) {
            return res.status(400).json({ message: 'Formato inválido para redes sociais. Deve ser um array.' });
          }
        } catch (error) {
          console.error('Erro ao processar redes sociais:', error);
          return res.status(400).json({ message: 'Formato inválido para redes sociais. Envie um array válido.' });
        }
      } else {
        redesSociaisArray = [{ nome: 'Rede Social', url: redesSociais }];
      }
    } else if (Array.isArray(redesSociais)) {
      redesSociaisArray = redesSociais;
    } else {
      return res.status(400).json({ message: 'Formato inválido para redes sociais. Envie um array.' });
    }

    // Criação da banda no banco de dados
    await Banda.create({
      nome,
      genero,
      descricao,
      membros: JSON.stringify(membrosArray),
      redesSociais: JSON.stringify(redesSociaisArray),
      email,
      password,
    });

    return res.status(201).json({ message: 'Banda cadastrada com sucesso' });

  } catch (err) {
    console.error('Erro ao cadastrar banda:', err);
    return res.status(500).json({ message: 'Erro ao processar o cadastro da banda' });
  }
};

// Função para fazer upload de foto de perfil Usuario

exports.UploadsProfilePictureUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
    }

    const profilePicturePath = path
      .join('uploads', 'profile-pictureUser', req.file.filename)
      .replace(/\\/g, '/');

    const user = await Usuario.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    user.profile_picture = profilePicturePath;
    await user.save();

    return res.status(200).json({
      message: 'Foto de perfil atualizada com sucesso!',
      photoUrl: profilePicturePath,
    });
  } catch (error) {
    console.error('Erro ao atualizar a foto de perfil:', error);
    return res.status(500).json({ message: 'Erro ao atualizar a foto de perfil.' });
  }
};


// Função para fazer upload de foto de perfil Banda

exports.UploadsProfilePictureBand = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
    }

    const profilePicturePath = path
      .join('uploads', 'profile-pictureBand', req.file.filename)
      .replace(/\\/g, '/');

    const user = await Banda.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Banda não encontrada.' });
    }

    user.profile_picture = profilePicturePath;
    await user.save();

    return res.status(200).json({
      message: 'Foto da banda atualizada com sucesso!',
      photoUrl: profilePicturePath,
    });
  } catch (error) {
    console.error('Erro ao atualizar a foto da banda:', error);
    return res.status(500).json({ message: 'Erro ao atualizar a foto da banda.' });
  }
};




// Função para exibir o dashboard do usuário
exports.dashboardUser = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        message: 'ID de usuário não encontrado. Verifique se o usuário está autenticado.',
      });
    }

    // Busca o usuário no banco de dados
    const user = await Usuario.findOne({
      where: { id: userId },
      attributes: ['id', 'nome', 'email', 'profile_picture'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Busca a banda (não associada ao usuário diretamente) com base no nome ou em outro critério
    // Exemplo: pegar a banda com um nome específico, ou buscar todas as bandas, dependendo da sua necessidade
    const banda = await Banda.findOne({
      where: {id: userId}, // Ou algum outro critério
      attributes: ['id', 'nome', 'profile_picture'],
    });

    // Retorna o usuário com os dados da banda (se a banda existir)
    return res.status(200).json({
      user: user.toJSON(),
      banda: banda ? banda.toJSON() : null,
    });

  } catch (error) {
    console.error('Erro ao buscar informações do usuário e da banda:', error);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
};

// Função para exibir o dashboardBand da Banda
exports.dashboardBand = async (req, res) => {
  try {
    const userBandId = req.user.id;
    const userBanda = await Banda.findOne({
      where: { id: userBandId },
      attributes: ['id', 'nome', 'email','profile_picture' ],
    });

   
    if (!userBanda) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(userBanda);
  } catch (error) {
    console.error('Erro ao buscar informações do usuário:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};


// Função de login do usuário
exports.loginUser = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
  }

  passport.authenticate('local-user', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Erro ao autenticar o usuário' });

    if (!user) {
      return res.status(401).json({ message: info?.message || 'Credenciais inválidas' });
    }

    req.login(user, { session: false }, (err) => {
      if (err) return res.status(500).json({ message: 'Erro ao fazer login' });

      const token = generateToken(user);
      return res.status(200).json({
        message: 'Login bem-sucedido',
        token,
        user: { id: user.id, nome: user.nome, email: user.email, foto: user.profile_picture },
      });
    });
  })(req, res, next);
};


// 🔹 Função de login da banda
exports.loginBand = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
  }

  passport.authenticate("local-band", (err, user, info) => {
    if (err) {
      console.error("Erro no Passport:", err);
      return res.status(500).json({ message: "Erro ao autenticar a banda" });
    }

    if (!user) {
      console.warn("Banda não encontrada:", info?.message);
      return res.status(401).json({ message: info?.message || "Credenciais inválidas" });
    }

    req.login(user, { session: false }, (err) => {
      if (err) return res.status(500).json({ message: "Erro ao fazer login" });

      const token = generateToken(user);
      return res.status(200).json({
        message: "Login bem-sucedido",
        token,
        user: { id: user.id, nome: user.nome, email: user.email, foto: user.profile_picture || null },
      });
    });
  })(req, res, next);
};

exports.postbands = async (req, res) => {
  try {
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    // Pega o ID da banda logada
    const bandId = req.user.id; // se o middleware salvar isso em req.user
    const fileUrl = `/upload/band-post/${req.file.filename}`;
    const fileType = req.file.mimetype;

    // Cria o post no banco
    const newPost = await  postBand.create({
      caption,
      file_url: fileUrl,
      file_type: fileType,
      band_id: bandId,
    });

    return res.status(201).json({
      message: 'Postagem criada com sucesso!',
      post: newPost,
    });
  } catch (error) {
    console.error('Erro ao salvar o post da banda:', error);
    res.status(500).json({ error: 'Erro ao salvar o post.' });
  }
}
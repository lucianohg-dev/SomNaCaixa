const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authenticateToken = require('../middlewares/authMiddleware');
const { uploadUser, uploadBand,uploadPostBand } = require('../middlewares/multerConfig');

// Rota de teste para a Home
router.get('/home', (req, res) => {
  res.send('Bem-vindo à Home!');
});

// Rotas de cadastro e login
router.post('/usuarios', UserController.createUser);
router.post('/bandas', UserController.createBand);
router.post('/loginUsers', UserController.loginUser);
router.post('/loginBands', UserController.loginBand);

// Upload de imagem de perfil do usuário
router.put(
  '/uploads-profile-pictureUser',
  authenticateToken,
  uploadUser.single('profile_picture'),
  UserController.UploadsProfilePictureUser
);

// Upload de imagem de perfil da banda
router.put('/uploads-profile-pictureBand',authenticateToken,uploadBand.single('profile_picture'),
  UserController.UploadsProfilePictureBand
);

// Dashboard dos usuários e bandas
router.get('/dashboardUser', authenticateToken, UserController.dashboardUser);
router.get('/dashboardBand', authenticateToken, UserController.dashboardBand);




// Rota para upload de postagens da banda
router.post('/uploads-band-post', authenticateToken,uploadPostBand.single('post_file'),UserController.postbands );

module.exports = router;

const multer = require('multer');
const path = require('path');

// Configuração do destino e nome do arquivo para usuários
const storageImagesUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile-pictureUser'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Filtro para aceitar apenas imagens de usuários
const fileFilterUser = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Apenas JPG, JPEG e PNG são aceitos.'));
  }
};

const uploadUser = multer({
  storage: storageImagesUser,
  fileFilter: fileFilterUser, // ✅ Correção aqui
  limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2MB
});

// Configuração do destino e nome do arquivo para bandas
const storageImagesBand = multer.diskStorage({ 
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile-pictureBand'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Filtro para aceitar apenas imagens de bandas
const fileFilterBand = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Apenas JPG, JPEG e PNG são aceitos.'));
  }
};

const uploadBand = multer({
  storage: storageImagesBand,
  fileFilter: fileFilterBand, // ✅ Correção aqui
  limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2MB
});



const storagePostsBand = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/post-band'); // Criar essa pasta antes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilterPosts = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'audio/mpeg', 'video/mp4'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Apenas imagens, MP3 e vídeos MP4 são aceitos.'));
  }
};

const uploadPostBand = multer({
  storage: storagePostsBand,
  fileFilter: fileFilterPosts,
  limits: { fileSize: 50 * 1024 * 1024 }, // Permitir arquivos maiores (ex: 50MB para vídeos/áudios)
});


module.exports = { uploadUser, uploadBand, uploadPostBand }; // ✅ Correção na exportação

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const passport= require('./config/passportConfig');

const userRoutes = require('./routes/userRoutes');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
require('../backend/scripts/sync');
const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sessionMiddleware(app);

app.use(flash());


app.use(
  session({
    secret: '403735llhg', // Substitua por uma chave secreta mais segura
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());


sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados foi bem-sucedida!'))
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    process.exit(1);
  });

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

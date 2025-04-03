const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const  Usuario  = require('../model/user');
const  Banda  = require('../model/banda');
const bcrypt = require ('bcrypt')// Usado para comparar o hash da senha

require('dotenv').config();  // Carrega as variáveis de ambiente do arquivo .env 



//🔹 Estratégia Local para usuários

passport.use(
  'local-user',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password', // Confirme que o frontend envia "password"
    },
    async (email, password, done) => {
      try {
        if (!email || !password) {
          return done(null, false, { message: 'Preencha todos os campos obrigatórios' });
        }

        const user = await Usuario.findOne({ where: { email } });

        if (!user) {
          console.log('Usuário não encontrado:', email);
          return done(null, false, { message: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Resultado da comparação de senha:', isMatch);

        if (!isMatch) {
          return done(null, false, { message: 'Credenciais inválidas' });
        }

        return done(null, user);
      } catch (err) {
        console.error('Erro durante a autenticação do usuário:', err);
        return done(err);
      }
    }
  )
);


// 🔹 Estratégia para login de banda
passport.use(
  "local-band",
  new LocalStrategy({ usernameField: "email", passwordField: 'password', }, async (email, password, done) => {
    try {
      const band = await Banda.findOne({ where: { email } });
      if (!band) return done(null, false, { message: "Banda não encontrada" });

      const isMatch = await bcrypt.compare(password, band.password);
      if (!isMatch) return done(null, false, { message: "Senha incorreta" });

      return done(null, band);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findByPk(id) || await Banda.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;

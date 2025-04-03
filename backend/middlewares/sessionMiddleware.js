const session = require("express-session");
const passport = require("passport");

module.exports = (app) => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET || "default_secret", // Use variável de ambiente
            resave: false, // Não salvar sessões não modificadas
            saveUninitialized: false, // Não salvar sessões não inicializadas
            cookie: {
                secure: process.env.NODE_ENV === "production", // Cookies seguros em produção
                maxAge: 1000 * 60 * 60 * 24, // 1 dia
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    console.log("Configuração de sessão e Passport concluída.");
};

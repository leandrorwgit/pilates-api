import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import { Usuario } from '../models/usuario'
import { JWT_SECRET } from '../util/secrets'
import bcrypt from 'bcrypt';

const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

passport.use(
  new LocalStrategy(
    { usernameField: 'email',
      passwordField: 'senha',
      session: false 
    }, 
    async (email, senha, done) => {
      try {
        const usuario = await Usuario.findOne({ where: { email: email.toLowerCase() } });
        if (!usuario)  {
          return done(undefined, false, { message: `Usuário ${email} não encontrado.` });
        }
        const senhaValida = bcrypt.compareSync(senha, usuario.senha);
        if (senhaValida) {
          return done(undefined, usuario);
        }
        return done(undefined, false, { message: 'Usuário ou senha inválida.' });
      } catch(erro) {
        return done(erro);
      }
  })
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async function (jwtToken, done) {
      // Usado o id configurado no payload do token (UsuarioController)
      try {
        const usuario = await Usuario.findByPk(jwtToken.id);
        if (usuario) {
          return done(undefined, usuario, jwtToken);
        } else {
          return done(undefined, false);
        }
      } catch (erro) {
         return done(erro, false);
      }
    }
  )
)
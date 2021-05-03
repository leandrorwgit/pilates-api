import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';
import { Validadoes } from '../util/validacoes-comuns';
import { Usuario, UsuarioAttributes } from '../models/usuario';
import { JWT_SECRET } from '../util/secrets';

export class UsuarioController {
  public async registrarUsuario(req: Request, res: Response): Promise<void> {
    try {
      Validadoes.campoStringNaoNulo(req.body.nome, 'nome');
      Validadoes.campoStringNaoNulo(req.body.email, 'email');
      Validadoes.campoStringNaoNulo(req.body.senha, 'senha');

      const senhaCripto = bcrypt.hashSync(req.body.senha, bcrypt.genSaltSync(10));

      const usuario = Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: senhaCripto,
        empresa: req.body.empresa,
        ativo: true
      });

      res.status(200).send({ token: gerarToken(await usuario) });
    } catch (erro) {
      res.status(400).send({ mensagem: erro.message });
    }
  }

  public autenticarUsuario(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', function (err, usuario, info) {
      // no async/await because passport works only with callback ..
      if (err) return next(err)
      if (!usuario) {
        return res.status(401).json({ status: 'Erro', code: 'Não autorizado!' })
      } else {
        res.status(200).send({ token: gerarToken(usuario) })
      }
    })
  }
}

function gerarToken(usuario: UsuarioAttributes) {
  // Usado id para buscar o usuário quando envia o token
  const payload = {
    id: usuario.id
  };

  return jwt.sign(payload, JWT_SECRET);
}


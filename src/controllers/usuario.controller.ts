import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { gerarJwt } from "../auth/gerarJwt";
import { Validadoes } from '../util/validacoes-comuns';
import { Usuario } from '../models/usuario';
import { getMensagemErro, InternalServerError } from '../util/erros';

export class UsuarioController {
  public async registrar(req: Request, res: Response): Promise<void> {
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
        cpf: req.body.cpf,
        ativo: true
      });

      res.status(200).send({ token: gerarJwt(await usuario) });
    } catch (erro) {
      console.log(erro);
      res.status(400).send({ mensagem: getMensagemErro(erro) });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.body.email, 'email');
      Validadoes.campoStringNaoNulo(req.body.senha, 'senha');

      const usuario = await Usuario.findOne({ where: { email: req.body.email.toLowerCase() } });
      if (!usuario)  {
        throw new InternalServerError(`Usuário ${req.body.email} não encontrado.`);
      }

      const senhaValida = bcrypt.compareSync(req.body.senha, usuario.senha);
      if (senhaValida) {
        res.status(200).send({ token: gerarJwt(usuario) });
      }

      throw new InternalServerError('Usuário ou senha inválida.');
    } catch (erro) {
      res.status(400).send({ mensagem: getMensagemErro(erro) });
    }
  }

  public async listarUsuario(req: Request, res: Response) {
    const usuarios = await Usuario.findAll();
    usuarios.forEach(usuario => {usuario.senha = ''});
    res.send(usuarios);
  }  
}

import { Request, Response } from 'express';
import { Validadoes } from '../util/validacoes-comuns';
import { Aluno } from '../models/aluno';
import { getMensagemErro, InternalServerError } from '../util/erros';

export class AlunoController {

  public async inserir(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.nome, 'nome');

      const aluno = await Aluno.create({
        idUsuario: req['usuario'].id,
        nome: req.body.nome,        
        idade: req.body.idade,
        dataNascimento: req.body.dataNascimento,
        profissao: req.body.profissao,
        celular: req.body.celular,
        email: req.body.email,
        objetivosPilates: req.body.objetivosPilates,
        queixas: req.body.queixas,
        formaPagamento: req.body.formaPagamento,
        diaPagamento: req.body.diaPagamento,
        aulaSeg: req.body.aulaSeg,
        aulaTer: req.body.aulaTer,
        aulaQua: req.body.aulaQua,
        aulaQui: req.body.aulaQui,
        aulaSex: req.body.aulaSex,
        aulaSab: req.body.aulaSab,
        ativo: true
      });

      res.status(200).send(aluno);
    } catch (erro) {
      res.status(400).send({ mensagem: getMensagemErro(erro) });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.nome, 'nome');
      Validadoes.campoStringNaoNulo(req.body.ativo, 'ativo');

      const aluno = await Aluno.findByPk(req.params.id);

      if (aluno.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode alterar esse registro.`);
      }

      aluno.nome = req.body.nome;
      aluno.idade = req.body.idade;
      aluno.dataNascimento = req.body.dataNascimento;
      aluno.profissao = req.body.profissao;
      aluno.celular = req.body.celular;
      aluno.email = req.body.email;
      aluno.objetivosPilates = req.body.objetivosPilates;
      aluno.queixas = req.body.queixas;
      aluno.formaPagamento = req.body.formaPagamento;
      aluno.diaPagamento = req.body.diaPagamento;
      aluno.aulaSeg = req.body.aulaSeg;
      aluno.aulaTer = req.body.aulaTer;
      aluno.aulaQua = req.body.aulaQua;
      aluno.aulaQui = req.body.aulaQui;
      aluno.aulaSex = req.body.aulaSex;
      aluno.aulaSab = req.body.aulaSab;
      aluno.ativo = req.body.ativo;
      const alunoAtualizado = await aluno.save();

      res.status(200).send(alunoAtualizado);
    } catch (erro) {
      res.status(400).send({ mensagem: getMensagemErro(erro) });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      /* 
      const produto = await Produto.findByPk(1);
produto.destroy();
*/
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req.body.nome, 'nome');

      const aluno = await Aluno.findByPk(req.params.id);
      aluno.nome = req.body.nome;
      aluno.idade = req.body.idade;
      aluno.dataNascimento = req.body.dataNascimento;
      aluno.profissao = req.body.profissao;
      aluno.celular = req.body.celular;
      aluno.email = req.body.email;
      aluno.objetivosPilates = req.body.objetivosPilates;
      aluno.queixas = req.body.queixas;
      aluno.formaPagamento = req.body.formaPagamento;
      aluno.diaPagamento = req.body.diaPagamento;
      aluno.aulaSeg = req.body.aulaSeg;
      aluno.aulaTer = req.body.aulaTer;
      aluno.aulaQua = req.body.aulaQua;
      aluno.aulaQui = req.body.aulaQui;
      aluno.aulaSex = req.body.aulaSex;
      aluno.aulaSab = req.body.aulaSab;
      aluno.ativo = req.body.ativo;
      const alunoAtualizado = await aluno.save();

      res.status(200).send(alunoAtualizado);
    } catch (erro) {
      res.status(400).send({ mensagem: getMensagemErro(erro) });
    }
  }  

  public async listar(req: Request, res: Response) {
    //const alunos = await Aluno.findAll({ include: ["usuario"] });
    const alunos = await Aluno.findAll();
    res.send(alunos);
  }  
}

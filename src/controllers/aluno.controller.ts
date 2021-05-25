import { Request, Response } from 'express';
import { Validadoes } from '../util/validacoes-comuns';
import { Aluno } from '../models/aluno';
import { getMensagemErro, InternalServerError } from '../util/erros';
import { Op } from 'sequelize';

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
        aulaHorarioInicio: req.body.aulaHorarioInicio,
        aulaDuracao: req.body.aulaDuracao,
        ativo: true
      });

      res.status(200).send(aluno);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao inserir aluno: '+getMensagemErro(erro) });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.nome, 'nome');
      Validadoes.campoStringNaoNulo(req.body.ativo, 'ativo');

      const aluno = await Aluno.findByPk(req.params.id);
      if (aluno == null )
        throw Error('Aluno não encontrado');

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
      aluno.aulaHorarioInicio = req.body.aulaHorarioInicio;
      aluno.aulaDuracao = req.body.aulaDuracao;
      aluno.ativo = req.body.ativo;
      const alunoAtualizado = await aluno.save();

      res.status(200).send(alunoAtualizado);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao atualizar aluno: '+getMensagemErro(erro) });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

      const aluno = await Aluno.findByPk(req.params.id);
      if (aluno == null )
        throw Error('Aluno não encontrado');

      if (aluno.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode excluir esse registro.`);
      }
 
      aluno.destroy();

      res.status(204).send();
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao deletar aluno: '+getMensagemErro(erro) });
    }
  }  

  public async listar(req: Request, res: Response) {
    //const alunos = await Aluno.findAll({ include: ["usuario"] });
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

    const whereNome = req.query.nome ? {nome: {[Op.iLike]: req.query.nome}} : {};
    const whereAtivo = req.query.ativo ? {ativo: req.query.ativo} : {};
    
    const offset = req.query.pagina && req.query.tamanhoMax ? 
      (Number.parseInt(req.query.pagina.toString()) * Number.parseInt(req.query.tamanhoMax.toString())) : undefined;
    const limit = req.query.tamanhoMax ? Number.parseInt(req.query.tamanhoMax.toString()) : undefined;

    const alunos = await Aluno.findAll({ 
      where: {
        [Op.and]: [
          {idUsuario: req['usuario'].id},
          whereNome,
          whereAtivo
        ]
      },
      offset: offset,
      limit: limit,
      order: [
        ['nome', 'ASC']
      ]
    });
    res.send(alunos);
  }  
}

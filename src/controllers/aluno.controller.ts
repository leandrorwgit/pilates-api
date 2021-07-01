import { Request, Response } from 'express';
import { Validadoes } from '../util/validacoes-comuns';
import { Aluno } from '../models/aluno';
import { getMensagemErro, InternalServerError } from '../util/erros';
import { Op, QueryTypes } from 'sequelize';
import { sequelize } from '../models';

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
        ativo: true,
        aulaHorarioInicioSeg: req.body.aulaHorarioInicioSeg,
        aulaHorarioInicioTer: req.body.aulaHorarioInicioTer,
        aulaHorarioInicioQua: req.body.aulaHorarioInicioQua,
        aulaHorarioInicioQui: req.body.aulaHorarioInicioQui,
        aulaHorarioInicioSex: req.body.aulaHorarioInicioSex,
        aulaHorarioInicioSab: req.body.aulaHorarioInicioSab,
        valorPagamento: req.body.valorPagamento,
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
      aluno.aulaHorarioInicioSeg = req.body.aulaHorarioInicioSeg;
      aluno.aulaHorarioInicioTer = req.body.aulaHorarioInicioTer;
      aluno.aulaHorarioInicioQua = req.body.aulaHorarioInicioQua;
      aluno.aulaHorarioInicioQui = req.body.aulaHorarioInicioQui;
      aluno.aulaHorarioInicioSex = req.body.aulaHorarioInicioSex;
      aluno.aulaHorarioInicioSab = req.body.aulaHorarioInicioSab;
      aluno.valorPagamento = req.body.valorPagamento;
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

  public async buscar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      
      const aluno = await Aluno.findByPk(req.params.id);
      if (aluno == null )
        throw Error('Aluno não encontrado');

      if (aluno.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode ver esse registro.`);
      }    

      res.send(aluno);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao buscar aluno: '+getMensagemErro(erro) });
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
  
  public async listarPorDiaSemana(req: Request, res: Response) {
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
    
    const retorno = await sequelize.query(
      'SELECT '+
      'SUM(CASE WHEN "aluno"."aulaSeg" THEN 1 ELSE 0 END) AS "totalAulaSeg", '+
      'SUM(CASE WHEN "aluno"."aulaTer" THEN 1 ELSE 0 END) AS "totalAulaTer", '+
      'SUM(CASE WHEN "aluno"."aulaQua" THEN 1 ELSE 0 END) AS "totalAulaQua", '+
      'SUM(CASE WHEN "aluno"."aulaQui" THEN 1 ELSE 0 END) AS "totalAulaQui", '+
      'SUM(CASE WHEN "aluno"."aulaSex" THEN 1 ELSE 0 END) AS "totalAulaSex", '+
      'SUM(CASE WHEN "aluno"."aulaSab" THEN 1 ELSE 0 END) AS "totalAulaSab" '+
      'FROM "Aluno" AS "aluno" '+
      'WHERE "aluno"."idUsuario" = :idUsuario '+
      'AND "aluno"."ativo" = true ',
      {
        raw: false,
        replacements: { idUsuario: req['usuario'].id, data: req.query.data },
        type: QueryTypes.SELECT
      }
    );
    res.send(retorno);
  }  
}

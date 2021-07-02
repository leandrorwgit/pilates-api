import { Request, Response } from 'express';
import { Validadoes } from '../util/validacoes-comuns';
import { ContasReceberPagamento } from '../models/contasreceberpagamento';
import { getMensagemErro, InternalServerError } from '../util/erros';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import { sequelize } from '../models';

export class ContasReceberPagamentoController {

  public async inserir(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.idAluno, 'idAluno');
      Validadoes.campoStringNaoNulo(req.body.dataPagamento, 'dataPagamento');
      Validadoes.campoStringNaoNulo(req.body.valorPago, 'valorPago');

      const contasReceberPagamento = await ContasReceberPagamento.create({
        idUsuario: req['usuario'].id,
        idAluno: req.body.idAluno,
        dataPagamento: req.body.dataPagamento,
        valorPago: req.body.valorPago,
        formaPagamento: req.body.formaPagamento,
      });

      res.status(200).send(contasReceberPagamento);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao inserir pagamento (cr): '+getMensagemErro(erro) });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.idAluno, 'idAluno');
      Validadoes.campoStringNaoNulo(req.body.dataPagamento, 'dataPagamento');
      Validadoes.campoStringNaoNulo(req.body.valorPago, 'valorPago');

      const contasReceberPagamento = await ContasReceberPagamento.findByPk(req.params.id);
      if (contasReceberPagamento == null )
      throw Error('Pagamento (cr) não encontrado');

      if (contasReceberPagamento.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode alterar esse registro.`);
      }

      contasReceberPagamento.idAluno = req.body.idAluno;
      contasReceberPagamento.dataPagamento = req.body.dataPagamento;
      contasReceberPagamento.valorPago = req.body.valorPago;
      contasReceberPagamento.formaPagamento = req.body.formaPagamento;
      const contasReceberPagamentoAtualizada = await contasReceberPagamento.save();

      res.status(200).send(contasReceberPagamentoAtualizada);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao atualizar pagamento (cr): '+getMensagemErro(erro) });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

      const contasReceberPagamento = await ContasReceberPagamento.findByPk(req.params.id);
      if (contasReceberPagamento == null)
        throw Error('Pagamento (cr) não encontrado');

      if (contasReceberPagamento.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode excluir esse registro.`);
      }
 
      contasReceberPagamento.destroy();

      res.status(204).send();
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao deletar pagamento (cr): '+getMensagemErro(erro) });
    }
  }  

  public async buscar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      
      const contasReceberPagamento = await ContasReceberPagamento.findByPk(req.params.id, { include: ["aluno"] });
      if (contasReceberPagamento == null)
        throw Error('Pagamento (cr) não encontrado');

      if (contasReceberPagamento.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode ver esse registro.`);
      } 
      
      res.send(contasReceberPagamento);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao buscar pagamento (cr): '+getMensagemErro(erro) });
    }
  }  

  public async listar(req: Request, res: Response) {
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

    const whereIdAluno = req.query.idAluno ? {idAluno: req.query.idAluno} : {};
    const whereDataPagamento = req.query.dataPagamento ? Sequelize.where(Sequelize.fn('date', Sequelize.col('dataPagamento')), req.query.dataPagamento.toString()) : {};
    
    const offset = req.query.pagina && req.query.tamanhoMax ? 
      (Number.parseInt(req.query.pagina.toString()) * Number.parseInt(req.query.tamanhoMax.toString())) : undefined;
    const limit = req.query.tamanhoMax ? Number.parseInt(req.query.tamanhoMax.toString()) : undefined;

    const contasReceberPagamentos = await ContasReceberPagamento.findAll({
      include: [{association: 'aluno', attributes: ['id', 'nome', 'valorPagamento']}], 
      where: {
        [Op.and]: [
          {idUsuario: req['usuario'].id},
          whereIdAluno,
          whereDataPagamento
        ]
      },
      offset: offset,
      limit: limit,
      order: [
        ['dataPagamento', 'ASC'],
        ['aluno', 'nome', 'ASC']
      ]
    });
    res.send(contasReceberPagamentos);
  }
  
  public async listarPagamentos(req: Request, res: Response) {
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
    Validadoes.campoStringNaoNulo(req.query.ano, 'ano');
    Validadoes.campoStringNaoNulo(req.query.mes, 'mes');
    
    const retorno = await sequelize.query(
      'SELECT '+ 
      '"aluno"."id" AS "idAluno", '+
      '"aluno"."nome" AS "nome", '+
      '"aluno"."valorPagamento" AS "valorPagamento", '+
      '"pagamento"."id" AS "idPagamento", '+
      '"pagamento"."valorPago" AS "valorPago" '+
      'FROM "Aluno" AS "aluno" '+
      'LEFT JOIN "ContasReceberPagamento" AS "pagamento" '+
      'ON "pagamento"."idAluno" = "aluno"."id" '+
      'AND "pagamento"."idUsuario" = "aluno"."idUsuario" '+
      'AND DATE_PART(\'year\', "pagamento"."dataPagamento") = :ano '+
      'AND DATE_PART(\'month\', "pagamento"."dataPagamento") = :mes '+
      'WHERE "aluno"."idUsuario" = :idUsuario '+
      'AND "aluno"."ativo" = TRUE '+
      'AND "aluno"."valorPagamento" IS NOT NULL ',
      {
        raw: false,
        replacements: { 
          idUsuario: req['usuario'].id, 
          ano: req.query.ano, 
          mes: req.query.mes 
        },
        type: QueryTypes.SELECT
      }
    );
    res.send(retorno);
  }  
}

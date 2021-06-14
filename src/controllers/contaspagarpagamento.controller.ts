import { Request, Response } from 'express';
import { Validadoes } from '../util/validacoes-comuns';
import { ContasPagarPagamento } from '../models/contaspagarpagamento';
import { getMensagemErro, InternalServerError } from '../util/erros';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import { sequelize } from '../models';

export class ContasPagarPagamentoController {

  public async inserir(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.idContasPagar, 'idContasPagar');
      Validadoes.campoStringNaoNulo(req.body.dataPagamento, 'dataPagamento');
      Validadoes.campoStringNaoNulo(req.body.valorPago, 'valorPago');

      const contasPagarPagamento = await ContasPagarPagamento.create({
        idUsuario: req['usuario'].id,
        idContasPagar: req.body.idContasPagar,
        dataPagamento: req.body.dataPagamento,
        valorPago: req.body.valorPago,
        formaPagamento: req.body.formaPagamento,
      });

      res.status(200).send(contasPagarPagamento);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao inserir pagamento (cp): '+getMensagemErro(erro) });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.idContasPagar, 'idContasPagar');
      Validadoes.campoStringNaoNulo(req.body.dataPagamento, 'dataPagamento');
      Validadoes.campoStringNaoNulo(req.body.valorPago, 'valorPago');

      const contasPagarPagamento = await ContasPagarPagamento.findByPk(req.params.id);
      if (contasPagarPagamento == null )
      throw Error('Pagamento (cp) não encontrado');

      if (contasPagarPagamento.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode alterar esse registro.`);
      }

      contasPagarPagamento.idContasPagar = req.body.idContasPagar;
      contasPagarPagamento.dataPagamento = req.body.dataPagamento;
      contasPagarPagamento.valorPago = req.body.valorPago;
      contasPagarPagamento.formaPagamento = req.body.formaPagamento;
      const contasPagarPagamentoAtualizada = await contasPagarPagamento.save();

      res.status(200).send(contasPagarPagamentoAtualizada);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao atualizar pagamento (cp): '+getMensagemErro(erro) });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

      const contasPagarPagamento = await ContasPagarPagamento.findByPk(req.params.id);
      if (contasPagarPagamento == null )
        throw Error('Pagamento (cp) não encontrado');

      if (contasPagarPagamento.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode excluir esse registro.`);
      }
 
      contasPagarPagamento.destroy();

      res.status(204).send();
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao deletar pagamento (cp): '+getMensagemErro(erro) });
    }
  }  

  public async buscar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      
      const contasPagarPagamento = await ContasPagarPagamento.findByPk(req.params.id, { include: ["contasPagar"] });
      if (contasPagarPagamento == null )
        throw Error('Evolução não encontrada');

      if (contasPagarPagamento.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode ver esse registro.`);
      } 
      
      res.send(contasPagarPagamento);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao buscar pagamento (cp): '+getMensagemErro(erro) });
    }
  }  

  public async listar(req: Request, res: Response) {
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

    const whereIdContasPagar = req.query.idContasPagar ? {idContasPagar: req.query.idContasPagar} : {};
    const whereDataPagamento = req.query.dataPagamento ? Sequelize.where(Sequelize.fn('date', Sequelize.col('dataPagamento')), req.query.dataPagamento.toString()) : {};
    
    const offset = req.query.pagina && req.query.tamanhoMax ? 
      (Number.parseInt(req.query.pagina.toString()) * Number.parseInt(req.query.tamanhoMax.toString())) : undefined;
    const limit = req.query.tamanhoMax ? Number.parseInt(req.query.tamanhoMax.toString()) : undefined;

    const contasPagarPagamentos = await ContasPagarPagamento.findAll({
      include: [{association: 'contasPagar', attributes: ['id', 'descricao']}], 
      where: {
        [Op.and]: [
          {idUsuario: req['usuario'].id},
          whereIdContasPagar,
          whereDataPagamento
        ]
      },
      offset: offset,
      limit: limit,
      order: [
        ['dataPagamento', 'ASC'],
        ['contasPagar', 'descricao', 'ASC']
      ]
    });
    res.send(contasPagarPagamentos);
  }
  
  public async listarPagamentos(req: Request, res: Response) {
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
    Validadoes.campoStringNaoNulo(req.query.ano, 'ano');
    Validadoes.campoStringNaoNulo(req.query.mes, 'mes');
    
    const retorno = await sequelize.query(
      'SELECT '+ 
      '"conta"."descricao" AS "descricao", '+
      '"conta"."valor" AS "valor", '+
      '"pagamento"."id" AS "idPagamento", '+
      '"pagamento"."valorPago" AS "valorPago" '+
      'FROM "ContasPagar" AS "conta" '+
      'LEFT JOIN "ContasPagarPagamento" AS "pagamento" '+
      'ON "pagamento"."idContasPagar" = "conta"."id" '+
      'AND "pagamento"."idUsuario" = "conta"."idUsuario" '+
      'AND DATE_PART(\'year\', "pagamento"."dataPagamento") = :ano '+
      'AND DATE_PART(\'month\', "pagamento"."dataPagamento") = :mes '+
      'WHERE "conta"."idUsuario" = :idUsuario '+
      'AND "conta"."ativo" = TRUE',
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

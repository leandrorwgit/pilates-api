import { Request, Response } from 'express';
import { Validadoes } from '../util/validacoes-comuns';
import { ContasPagar } from '../models/contaspagar';
import { getMensagemErro, InternalServerError } from '../util/erros';
import { Op } from 'sequelize';

export class ContasPagarController {

  public async inserir(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.descricao, 'descricao');
      Validadoes.campoStringNaoNulo(req.body.diaVencimento, 'diaVencimento');
      Validadoes.campoStringNaoNulo(req.body.valor, 'valor');

      const aluno = await ContasPagar.create({
        idUsuario: req['usuario'].id,
        descricao: req.body.descricao,        
        diaVencimento: req.body.diaVencimento,
        valor: req.body.valor,
        formaPagamento: req.body.formaPagamento,
        ativo: true
      });

      res.status(200).send(aluno);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao inserir conta a pagar: '+getMensagemErro(erro) });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.descricao, 'descricao');
      Validadoes.campoStringNaoNulo(req.body.diaVencimento, 'diaVencimento');
      Validadoes.campoStringNaoNulo(req.body.valor, 'valor');

      const contasPagar = await ContasPagar.findByPk(req.params.id);
      if (contasPagar == null )
        throw Error('Conta a pagar não encontrada');

      if (contasPagar.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode alterar esse registro.`);
      }

      contasPagar.descricao = req.body.descricao;
      contasPagar.diaVencimento = req.body.diaVencimento;
      contasPagar.valor = req.body.valor;
      contasPagar.formaPagamento = req.body.formaPagamento;
      contasPagar.ativo = req.body.ativo;
      const contasPagarAtualizado = await contasPagar.save();

      res.status(200).send(contasPagarAtualizado);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao atualizar conta a pagar: '+getMensagemErro(erro) });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

      const contasPagar = await ContasPagar.findByPk(req.params.id);
      if (contasPagar == null )
        throw Error('Conta a pagar não encontrada');

      if (contasPagar.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode excluir esse registro.`);
      }
 
      contasPagar.destroy();

      res.status(204).send();
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao deletar conta a pagar: '+getMensagemErro(erro) });
    }
  }  

  public async buscar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      
      const contasPagar = await ContasPagar.findByPk(req.params.id);
      if (contasPagar == null )
        throw Error('Conta a pagar não encontrada');

      if (contasPagar.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode ver esse registro.`);
      }    

      res.send(contasPagar);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao buscar conta a pagar: '+getMensagemErro(erro) });
    }
  }

  public async listar(req: Request, res: Response) {
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

    const whereDescricao = req.query.descricao ? {descricao: {[Op.iLike]: req.query.descricao}} : {};
    const whereAtivo = req.query.ativo ? {ativo: req.query.ativo} : {};
    
    const offset = req.query.pagina && req.query.tamanhoMax ? 
      (Number.parseInt(req.query.pagina.toString()) * Number.parseInt(req.query.tamanhoMax.toString())) : undefined;
    const limit = req.query.tamanhoMax ? Number.parseInt(req.query.tamanhoMax.toString()) : undefined;

    const listaContas = await ContasPagar.findAll({ 
      where: {
        [Op.and]: [
          {idUsuario: req['usuario'].id},
          whereDescricao,
          whereAtivo
        ]
      },
      offset: offset,
      limit: limit,
      order: [
        ['descricao', 'ASC']
      ]
    });
    res.send(listaContas);
  }  
}

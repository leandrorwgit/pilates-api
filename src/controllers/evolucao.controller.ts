import { Request, Response } from 'express';
import { Validadoes } from '../util/validacoes-comuns';
import { Evolucao } from '../models/evolucao';
import { getMensagemErro, InternalServerError } from '../util/erros';
import { Op, Sequelize } from 'sequelize';

export class EvolucaoController {

  public async inserir(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.idAluno, 'idAluno');
      Validadoes.campoStringNaoNulo(req.body.data, 'data');

      const evolucao = await Evolucao.create({
        idUsuario: req['usuario'].id,
        idAluno: req.body.idAluno,
        data: req.body.data,
        comoChegou: req.body.comoChegou,
        condutasUtilizadas: req.body.condutasUtilizadas,
        aparelhosUtilizados: req.body.aparelhosUtilizados,
        comoSaiu: req.body.comoSaiu,
        orientacoesDomiciliares: req.body.orientacoesDomiciliares,        
      });

      res.status(200).send(evolucao);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao inserir evolução: '+getMensagemErro(erro) });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.idAluno, 'idAluno');
      Validadoes.campoStringNaoNulo(req.body.data, 'data');

      const evolucao = await Evolucao.findByPk(req.params.id);
      if (evolucao == null )
      throw Error('Evolução não encontrada');

      if (evolucao.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode alterar esse registro.`);
      }

      evolucao.idAluno = req.body.idAluno;
      evolucao.data = req.body.data;
      evolucao.comoChegou = req.body.comoChegou;
      evolucao.condutasUtilizadas = req.body.condutasUtilizadas;
      evolucao.aparelhosUtilizados = req.body.aparelhosUtilizados;
      evolucao.comoSaiu = req.body.comoSaiu;
      evolucao.orientacoesDomiciliares = req.body.orientacoesDomiciliares;       
      const evolucaoAtualizada = await evolucao.save();

      res.status(200).send(evolucaoAtualizada);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao atualizar evolução: '+getMensagemErro(erro) });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

      const evolucao = await Evolucao.findByPk(req.params.id);
      if (evolucao == null )
        throw Error('Evolução não encontrada');

      if (evolucao.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode excluir esse registro.`);
      }
 
      evolucao.destroy();

      res.status(204).send();
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao deletar evolução: '+getMensagemErro(erro) });
    }
  }  

  public async buscar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      
      const evolucao = await Evolucao.findByPk(req.params.id, { include: ["aluno"] });
      if (evolucao == null )
        throw Error('Evolução não encontrada');

      if (evolucao.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode ver esse registro.`);
      } 
      
      res.send(evolucao);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao buscar evolução: '+getMensagemErro(erro) });
    }
  }  

  public async listar(req: Request, res: Response) {
    //const evolucoes = await Evolucao.findAll({ include: ["usuario"] });
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

    const whereIdAluno = req.query.idAluno ? {idAluno: req.query.idAluno} : {};
    //const whereData = req.query.data ? {data: req.query.data} : {};
    const whereData = req.query.data ? Sequelize.where(Sequelize.fn('date', Sequelize.col('data')), req.query.data.toString()) : {};
    
    const offset = req.query.pagina && req.query.tamanhoMax ? 
      (Number.parseInt(req.query.pagina.toString()) * Number.parseInt(req.query.tamanhoMax.toString())) : undefined;
    const limit = req.query.tamanhoMax ? Number.parseInt(req.query.tamanhoMax.toString()) : undefined;

    const evolucoes = await Evolucao.findAll({
      include: [{association: 'aluno', attributes: ['id', 'nome']}], 
      where: {
        [Op.and]: [
          {idUsuario: req['usuario'].id},
          whereIdAluno,
          whereData
        ]
      },
      offset: offset,
      limit: limit,
      order: [
        ['data', 'ASC'],
        ['aluno', 'nome', 'ASC']
      ]
    });
    res.send(evolucoes);
  }  
}

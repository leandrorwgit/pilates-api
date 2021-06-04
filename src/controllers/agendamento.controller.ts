import { Request, Response } from 'express';
import { Validadoes } from '../util/validacoes-comuns';
import { Agendamento } from '../models/agendamento';
import { getMensagemErro, InternalServerError } from '../util/erros';
import { Op, Sequelize } from 'sequelize';

export class AgendamentoController {

  public async inserir(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');      
      Validadoes.campoStringNaoNulo(req.body.dataHoraInicio, 'dataHoraInicio');
      Validadoes.campoStringNaoNulo(req.body.duracao, 'duracao');

      const agendamento = await Agendamento.create({
        idUsuario: req['usuario'].id,
        idAluno: req.body.idAluno,
        dataHoraInicio: req.body.dataHoraInicio,
        duracao: req.body.duracao,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        situacao: req.body.situacao,
      });

      res.status(200).send(agendamento);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao inserir agendamento: '+getMensagemErro(erro) });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.dataHoraInicio, 'dataHoraInicio');
      Validadoes.campoStringNaoNulo(req.body.duracao, 'duracao');

      const agendamento = await Agendamento.findByPk(req.params.id);
      if (agendamento == null )
      throw Error('Agendamento não encontrado');

      if (agendamento.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode alterar esse registro.`);
      }

      agendamento.idAluno = req.body.idAluno;
      agendamento.dataHoraInicio = req.body.dataHoraInicio;
      agendamento.duracao = req.body.duracao;
      agendamento.titulo = req.body.titulo;
      agendamento.descricao = req.body.descricao;
      agendamento.situacao = req.body.situacao;
      const agendamentoAtualizado = await agendamento.save();

      res.status(200).send(agendamentoAtualizado);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao atualizar agendamento: '+getMensagemErro(erro) });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

      const agendamento = await Agendamento.findByPk(req.params.id);
      if (agendamento == null )
        throw Error('Agendamento não encontrado');

      if (agendamento.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode excluir esse registro.`);
      }
 
      agendamento.destroy();

      res.status(204).send();
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao deletar agendamento: '+getMensagemErro(erro) });
    }
  }  

  public async buscar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      
      const agendamento = await Agendamento.findByPk(req.params.id, { include: ["aluno"] });
      if (agendamento == null )
        throw Error('Agendamento não encontrado');

      if (agendamento.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode ver esse registro.`);
      } 
      
      res.send(agendamento);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao buscar agendamento: '+getMensagemErro(erro) });
    }
  }  

  public async listar(req: Request, res: Response) {
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

    const whereIdAluno = req.query.idAluno ? {idAluno: req.query.idAluno} : {};
    const whereData = req.query.data ? Sequelize.where(Sequelize.fn('date', Sequelize.col('dataHoraInicio')), req.query.data.toString()) : {};
    
    const offset = req.query.pagina && req.query.tamanhoMax ? 
      (Number.parseInt(req.query.pagina.toString()) * Number.parseInt(req.query.tamanhoMax.toString())) : undefined;
    const limit = req.query.tamanhoMax ? Number.parseInt(req.query.tamanhoMax.toString()) : undefined;

    const agendamentos = await Agendamento.findAll({
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
        ['dataHoraInicio', 'ASC'],
        ['aluno', 'nome', 'ASC']
      ]
    });
    res.send(agendamentos);
  }  
}

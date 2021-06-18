import { Request, Response } from 'express';
import { Validadoes } from '../util/validacoes-comuns';
import { Configuracao } from '../models/configuracao';
import { getMensagemErro, InternalServerError } from '../util/erros';

export class ConfiguracaoController {

  public async inserir(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.duracaoPadraoAula, 'duracaoPadraoAula');

      const configuracao = await Configuracao.create({
        idUsuario: req['usuario'].id,
        duracaoPadraoAula: req.body.duracaoPadraoAula,        
      });

      res.status(200).send(configuracao);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao inserir configuração: '+getMensagemErro(erro) });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.body.duracaoPadraoAula, 'duracaoPadraoAula');

      const configuracao = await Configuracao.findByPk(req.params.id);
      if (configuracao == null )
        throw Error('Configuração não encontrada');

      if (configuracao.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode alterar esse registro.`);
      }

      configuracao.duracaoPadraoAula = req.body.duracaoPadraoAula;
      const configuracaoAtualizada = await configuracao.save();

      res.status(200).send(configuracaoAtualizada);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao atualizar configuração: '+getMensagemErro(erro) });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

      const configuracao = await Configuracao.findByPk(req.params.id);
      if (configuracao == null )
        throw Error('Configuração não encontrada');

      if (configuracao.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode excluir esse registro.`);
      }
 
      configuracao.destroy();

      res.status(204).send();
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao deletar configuração: '+getMensagemErro(erro) });
    }
  }  

  public async buscar(req: Request, res: Response) {
    try {
      Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
      Validadoes.campoStringNaoNulo(req.params.id, 'id');
      
      const configuracao = await Configuracao.findByPk(req.params.id);
      if (configuracao == null )
        throw Error('Configuração não encontrada');

      if (configuracao.idUsuario != req['usuario'].id) {
        throw new InternalServerError(`Usuário ${req['usuario'].id} não pode ver esse registro.`);
      }    

      res.send(configuracao);
    } catch (erro) {
      res.status(400).send({ mensagem: 'Erro ao buscar configuração: '+getMensagemErro(erro) });
    }
  }

  public async listar(req: Request, res: Response) {
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');

    const configuracoes = await Configuracao.findAll({ 
      where: {idUsuario: req['usuario'].id},
    });
    res.send(configuracoes);
  }  
}

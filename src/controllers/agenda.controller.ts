import { Request, Response } from 'express';
import { sequelize } from '../models';
import { Validadoes } from '../util/validacoes-comuns';
const { QueryTypes } = require('sequelize');

export class AgendaController {

  public async listar(req: Request, res: Response) {
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
    Validadoes.campoStringNaoNulo(req.query.data, 'data');
    
    const retorno = await sequelize.query(
      'select '+
      'aluno.nome as descricao, '+
      'cast(aluno."aulaHorarioInicio" as time) as horaIni, '+
      'cast(aluno."aulaHorarioInicio" as time) + (aluno."aulaDuracao"||\' min\')::interval as horaFim, '+
      'date :data as dia '+
      'from "Aluno" as aluno '+
      'where aluno."idUsuario" = :idUsuario '+
      'and (((extract(isodow from date :data) = 1) and (aluno."aulaSeg" = true)) '+
      'or ((extract(isodow from date :data) = 2) and (aluno."aulaTer" = true)) '+
      'or ((extract(isodow from date :data) = 3) and (aluno."aulaQua" = true)) '+
      'or ((extract(isodow from date :data) = 4) and (aluno."aulaQui" = true)) '+
      'or ((extract(isodow from date :data) = 5) and (aluno."aulaSex" = true)) '+
      'or ((extract(isodow from date :data) = 6) and (aluno."aulaSab" = true))) ',
      {
        replacements: { idUsuario: req['usuario'].id, data: req.query.data },
        type: QueryTypes.SELECT
      }
    );
    res.send(retorno);
  }  
}

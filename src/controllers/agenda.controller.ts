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
      'aluno."nome" as descricao, '+
      'cast(aluno."aulaHorarioInicio" as time) as horaIni, '+
      'cast(aluno."aulaHorarioInicio" as time) + (aluno."aulaDuracao"||\' min\')::interval as horaFim, '+
      'dias.dia as dia '+
      'from "Aluno" as aluno '+
      'join (SELECT * FROM (VALUES (date :data - 1), (date :data), (date :data + 1)) AS d (dia)) as dias on true '+
      'where aluno."idUsuario" = :idUsuario '+
      'and aluno."ativo" = true '+
      'and (((extract(isodow from dias.dia) = 1) and (aluno."aulaSeg" = true)) '+
      'or ((extract(isodow from dias.dia) = 2) and (aluno."aulaTer" = true)) '+
      'or ((extract(isodow from dias.dia) = 3) and (aluno."aulaQua" = true)) '+
      'or ((extract(isodow from dias.dia) = 4) and (aluno."aulaQui" = true)) '+
      'or ((extract(isodow from dias.dia) = 5) and (aluno."aulaSex" = true)) '+
      'or ((extract(isodow from dias.dia) = 6) and (aluno."aulaSab" = true))) '+
      'order by dias.dia, cast(aluno."aulaHorarioInicio" as time) ',
      {
        replacements: { idUsuario: req['usuario'].id, data: req.query.data },
        type: QueryTypes.SELECT
      }
    );
    res.send(retorno);
  }  
}

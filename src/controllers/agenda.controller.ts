import { Request, Response } from 'express';
import { sequelize } from '../models';
import { Validadoes } from '../util/validacoes-comuns';
const { QueryTypes } = require('sequelize');

export class AgendaController {

  public async listar(req: Request, res: Response) {
    Validadoes.campoStringNaoNulo(req['usuario'].id, 'idUsuario');
    Validadoes.campoStringNaoNulo(req.query.data, 'data');
    
    const retorno = await sequelize.query(
      'SELECT '+
      '"aluno"."nome" AS "descricao", '+
      'CAST("aluno"."aulaHorarioInicio" AS time) AS "horaIni", '+
      'CAST("aluno"."aulaHorarioInicio" AS time) + ("aluno"."aulaDuracao"||\' min\')::interval AS "horaFim", '+
      '"dias"."dia" AS "dia", '+
      '"evolucao"."id" AS "idEvolucao" '+
      'from "Aluno" AS "aluno" '+
      'JOIN (SELECT * FROM (VALUES (date :data - 1), (date :data), (date :data + 1)) AS d (dia)) as "dias" ON true '+
      'LEFT JOIN "Evolucao" AS "evolucao" ON "evolucao"."idAluno" = "aluno"."id" '+
      'AND CAST("evolucao"."data" AS DATE) = "dias"."dia" '+
      'AND "evolucao"."idUsuario" = "aluno"."idUsuario" '+
      'WHERE "aluno"."idUsuario" = :idUsuario '+
      'AND "aluno"."ativo" = true '+
      'AND (((EXTRACT(isodow FROM "dias"."dia") = 1) AND ("aluno"."aulaSeg" = true)) '+
      'OR ((EXTRACT(isodow FROM "dias"."dia") = 2) AND ("aluno"."aulaTer" = true)) '+
      'OR ((EXTRACT(isodow FROM "dias"."dia") = 3) AND ("aluno"."aulaQua" = true)) '+
      'OR ((EXTRACT(isodow FROM "dias"."dia") = 4) AND ("aluno"."aulaQui" = true)) '+
      'OR ((EXTRACT(isodow FROM "dias"."dia") = 5) AND ("aluno"."aulaSex" = true)) '+
      'OR ((EXTRACT(isodow FROM "dias"."dia") = 6) AND ("aluno"."aulaSab" = true))) '+
      'ORDER BY "dias"."dia", CAST("aluno"."aulaHorarioInicio" AS time), "aluno"."nome" ',
      {
        replacements: { idUsuario: req['usuario'].id, data: req.query.data },
        type: QueryTypes.SELECT
      }
    );
    res.send(retorno);
  }  
}

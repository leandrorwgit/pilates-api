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
      '\'ALUNO\' AS "tipo", '+
      'NULL AS "idAgendamento", '+ 
      'NULL AS "situacao", '+
      '"aluno"."id" AS "idAluno", '+
      '"aluno"."nome" AS "descricao", '+
      'CAST(COALESCE(( '+
      '  CASE '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 1)) THEN "aluno"."aulaHorarioInicioSeg" '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 2)) THEN "aluno"."aulaHorarioInicioTer" '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 3)) THEN "aluno"."aulaHorarioInicioQua" '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 4)) THEN "aluno"."aulaHorarioInicioQui" '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 5)) THEN "aluno"."aulaHorarioInicioSex" '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 6)) THEN "aluno"."aulaHorarioInicioSab" '+
      '    ELSE NULL '+
      '  END '+
      '), "aluno"."aulaHorarioInicio") AS time) AS "horaIni", '+
      'CAST(COALESCE(( '+
      '  CASE '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 1)) THEN "aluno"."aulaHorarioInicioSeg" '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 2)) THEN "aluno"."aulaHorarioInicioTer" '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 3)) THEN "aluno"."aulaHorarioInicioQua" '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 4)) THEN "aluno"."aulaHorarioInicioQui" '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 5)) THEN "aluno"."aulaHorarioInicioSex" '+
      '    WHEN ((EXTRACT(isodow FROM "dias"."dia") = 6)) THEN "aluno"."aulaHorarioInicioSab" '+
      '    ELSE NULL '+
      '  END '+
      '), "aluno"."aulaHorarioInicio") AS time) + ("aluno"."aulaDuracao"||\' min\')::interval AS "horaFim", '+
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
      'AND "aluno"."id" NOT IN ( '+
      '  SELECT "agendamento"."idAluno" '+
      '  FROM "Agendamento" AS "agendamento" '+
      '  WHERE CAST("agendamento"."dataHoraInicio" AS DATE) = "dias"."dia" '+
      '  AND "agendamento"."situacao" = \'CANCELADO\' '+
      ') '+
      'UNION '+
      'SELECT '+
      '\'AGENDAMENTO\' AS "tipo", '+
      '"agendamento"."id" AS "idAgendamento", '+ 
      '"agendamento"."situacao" AS "situacao", '+
      '"aluno"."id" AS "idAluno", '+
      '"agendamento"."titulo" AS "descricao", '+
      'CAST("agendamento"."dataHoraInicio" AS time) AS "horaIni", '+
      'CAST("agendamento"."dataHoraInicio" AS time) + ("agendamento"."duracao"||\' min\')::interval AS "horaFim", '+
      '"dias"."dia" AS "dia", '+
      '"evolucao"."id" AS "idEvolucao" '+
      'FROM "Agendamento" AS "agendamento" '+
      'JOIN (SELECT * FROM (VALUES (date :data - 1), (date :data), (date :data + 1)) AS d (dia)) as "dias" ON '+
      '"dias"."dia" = CAST("agendamento"."dataHoraInicio" AS DATE) '+
      'LEFT JOIN "Aluno" AS "aluno" ON "aluno"."id" = "agendamento"."idAluno" '+
      'AND "aluno"."idUsuario" = "agendamento"."idUsuario" '+
      'AND "aluno"."ativo" = TRUE '+
      'LEFT JOIN "Evolucao" AS "evolucao" ON "evolucao"."idAluno" = "aluno"."id" '+
      'AND CAST("evolucao"."data" AS DATE) = "dias"."dia" '+
      'AND "evolucao"."idUsuario" = "aluno"."idUsuario" '+
      'WHERE "agendamento"."situacao" != \'CANCELADO\' '+
      'AND "agendamento"."idUsuario" = :idUsuario '+
      'ORDER BY "dia", "horaIni", "descricao" ',
      {
        raw: false,
        replacements: { idUsuario: req['usuario'].id, data: req.query.data },
        type: QueryTypes.SELECT
      }
    );
    res.send(retorno);
  }  
}

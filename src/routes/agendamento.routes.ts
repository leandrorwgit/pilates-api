import { Router } from 'express'
import { verificarJwt } from "../auth/verificarJwt";
import { AgendamentoController } from '../controllers/agendamento.controller'

export class AgendamentoRoutes {
  router: Router
  public agendamentoController = new AgendamentoController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/', [verificarJwt], this.agendamentoController.inserir);
    this.router.put('/:id', [verificarJwt], this.agendamentoController.atualizar);
    this.router.delete('/:id', [verificarJwt], this.agendamentoController.deletar);

    this.router.get('/:id', [verificarJwt], this.agendamentoController.buscar);
    this.router.get('/', [verificarJwt], this.agendamentoController.listar);
  }
}
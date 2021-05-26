import { Router } from 'express'
import { verificarJwt } from "../auth/verificarJwt";
import { AgendaController } from '../controllers/agenda.controller'

export class AgendaRoutes {
  router: Router
  public agendaController = new AgendaController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.get('/', [verificarJwt], this.agendaController.listar);
  }
}
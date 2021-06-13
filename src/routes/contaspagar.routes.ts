import { Router } from 'express'
import { verificarJwt } from "../auth/verificarJwt";
import { ContasPagarController } from '../controllers/contaspagar.controller'

export class ContasPagarRoutes {
  router: Router
  public contasPagarController = new ContasPagarController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/', [verificarJwt], this.contasPagarController.inserir);
    this.router.put('/:id', [verificarJwt], this.contasPagarController.atualizar);
    this.router.delete('/:id', [verificarJwt], this.contasPagarController.deletar);

    this.router.get('/:id', [verificarJwt], this.contasPagarController.buscar);
    this.router.get('/', [verificarJwt], this.contasPagarController.listar);
  }
}
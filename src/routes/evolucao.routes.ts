import { Router } from 'express'
import { verificarJwt } from "../auth/verificarJwt";
import { EvolucaoController } from '../controllers/evolucao.controller'

export class EvolucaoRoutes {
  router: Router
  public evolucaoController = new EvolucaoController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/', [verificarJwt], this.evolucaoController.inserir);
    this.router.put('/:id', [verificarJwt], this.evolucaoController.atualizar);
    this.router.delete('/:id', [verificarJwt], this.evolucaoController.deletar);

    this.router.get('/', [verificarJwt], this.evolucaoController.listar);
  }
}
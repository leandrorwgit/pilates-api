import { Router } from 'express'
import { verificarJwt } from "../auth/verificarJwt";
import { ConfiguracaoController } from '../controllers/configuracao.controller'

export class ConfiguracaoRoutes {
  router: Router
  public configuracaoController = new ConfiguracaoController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/', [verificarJwt], this.configuracaoController.inserir);
    this.router.put('/:id', [verificarJwt], this.configuracaoController.atualizar);
    this.router.delete('/:id', [verificarJwt], this.configuracaoController.deletar);

    this.router.get('/:id', [verificarJwt], this.configuracaoController.buscar);
    this.router.get('/', [verificarJwt], this.configuracaoController.listar);
  }
}
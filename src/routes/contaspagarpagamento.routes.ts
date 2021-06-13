import { Router } from 'express'
import { verificarJwt } from "../auth/verificarJwt";
import { ContasPagarPagamentoController } from '../controllers/contaspagarpagamento.controller'

export class ContasPagarPagamentoRoutes {
  router: Router
  public contasPagarPagamentoController = new ContasPagarPagamentoController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/', [verificarJwt], this.contasPagarPagamentoController.inserir);
    this.router.put('/:id', [verificarJwt], this.contasPagarPagamentoController.atualizar);
    this.router.delete('/:id', [verificarJwt], this.contasPagarPagamentoController.deletar);

    this.router.get('/:id', [verificarJwt], this.contasPagarPagamentoController.buscar);
    this.router.get('/', [verificarJwt], this.contasPagarPagamentoController.listar);
  }
}
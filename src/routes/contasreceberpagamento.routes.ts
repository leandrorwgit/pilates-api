import { Router } from 'express'
import { verificarJwt } from "../auth/verificarJwt";
import { ContasReceberPagamentoController } from '../controllers/contasreceberpagamento.controller'

export class ContasReceberPagamentoRoutes {
  router: Router
  public contasReceberPagamentoController = new ContasReceberPagamentoController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/', [verificarJwt], this.contasReceberPagamentoController.inserir);
    this.router.put('/:id', [verificarJwt], this.contasReceberPagamentoController.atualizar);
    this.router.delete('/:id', [verificarJwt], this.contasReceberPagamentoController.deletar);

    this.router.get('/pagamentos', [verificarJwt], this.contasReceberPagamentoController.listarPagamentos);
    this.router.get('/:id', [verificarJwt], this.contasReceberPagamentoController.buscar);
    this.router.get('/', [verificarJwt], this.contasReceberPagamentoController.listar);
  }
}
import { Router } from 'express'
import { verificarJwt } from "../auth/verificarJwt";
import { AlunoController } from '../controllers/aluno.controller'

export class AlunoRoutes {
  router: Router
  public alunoController = new AlunoController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/', [verificarJwt], this.alunoController.inserir);
    this.router.put('/:id', [verificarJwt], this.alunoController.atualizar);
    this.router.delete('/:id', [verificarJwt], this.alunoController.deletar);

    this.router.get('/diasemana', [verificarJwt], this.alunoController.listarPorDiaSemana);
    this.router.get('/:id', [verificarJwt], this.alunoController.buscar);
    this.router.get('/', [verificarJwt], this.alunoController.listar);

  }
}
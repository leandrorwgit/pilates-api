import { Router } from 'express'
import { verificarJwt } from "../auth/verificarJwt";
import { UsuarioController } from '../controllers/usuario.controller'

export class UsuarioRoutes {
  router: Router
  public usuarioController = new UsuarioController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/registrar', this.usuarioController.registrar);
    this.router.post('/login', this.usuarioController.login);

    this.router.get('/', [verificarJwt], this.usuarioController.listarUsuario);
  }
}
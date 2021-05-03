import { Router } from 'express'
import { AuthMiddleware } from '../auth/auth.middleware'
import { UsuarioController } from '../controllers/usuario.controller'

export class UsuarioRoutes {
  router: Router
  public usuarioController: UsuarioController = new UsuarioController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/registrar', this.usuarioController.registrarUsuario);
    this.router.post('/login', AuthMiddleware.autorizarJWT, this.usuarioController.autenticarUsuario);
  }
}
import { Router } from 'express'
import { UsuarioController } from '../controllers/usuario.controller';

export const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get('/usuario', (req, res) => {
  usuarioController.buscarTodos().then(usuario => {
		res.send(usuario);
	}).catch((erro) => {
		res.status(500).send('Erro ao buscar usuários: '+erro);
	});
});
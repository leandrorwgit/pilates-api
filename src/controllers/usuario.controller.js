import Usuario from "../models/usuario";

export class UsuarioController {
	buscarTodos() {
		return Usuario.findAll();
	}
}
const db = require('../config/db.config.js');
const Usuario = db.usuario;
 
exports.buscarTodos = (req, res) => {
	Usuario.findAll().then(usuario => {
		res.send(usuario);
	});
};
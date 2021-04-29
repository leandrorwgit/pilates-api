module.exports = function(app) { 
  const usuarioController = require('../controller/usuario.controller.js.js');

  // Retrieve all Customer
  app.get('/api/usuario', usuarioController.buscarTodos);
}
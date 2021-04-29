module.exports = function(app) { 
  const usuarioController = require('../controllers/usuario.controller.js');

  // Retrieve all Customer
  app.get('/api/usuario', usuarioController.buscarTodos);
}
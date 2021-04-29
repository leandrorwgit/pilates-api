module.exports = (sequelize, Sequelize) => {
	const Usuarios = sequelize.define('Usuarios', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		nome: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		senha: {
			type: Sequelize.STRING
		},
		empresa: {
			type: Sequelize.STRING
		},
		ativo: {
			type: Sequelize.BOOLEAN
		},
		createdAt: {
			type: Sequelize.DATE
		},
		updatedAt: {
			type: Sequelize.DATE
		}
  });

  return Usuarios;
}
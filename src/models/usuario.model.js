module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define('usuario', {
		id: {
			type: Sequelize.INTEGER
		},
		nome: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		empresa: {
			type: Sequelize.STRING
		},
		ativo: {
			type: Sequelize.BOOLEAN
		},
		dataCriacao: {
			type: Sequelize.DATE
		},
		dataAtualizacao: {
			type: Sequelize.DATE
		}
  });

  return Usuario;
}
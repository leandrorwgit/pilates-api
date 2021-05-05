module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Alunos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, 
      idUsuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id'
        }            
      },    
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idade: {
        type: Sequelize.INTEGER
      },
      dataNascimento: {
        type: Sequelize.DATE
      },
      profissao: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      objetivosPilates: {
        type: Sequelize.TEXT
      },
      queixas: {
        type: Sequelize.TEXT
      },
      formaPagamento: {
        type: Sequelize.STRING
      },
      diaPagamento: {
        type: Sequelize.INTEGER
      },
      aulaSeg: {
        type: Sequelize.BOOLEAN
      },
      aulaTer: {
        type: Sequelize.BOOLEAN
      },
      aulaQua: {
        type: Sequelize.BOOLEAN
      },
      aulaQui: {
        type: Sequelize.BOOLEAN
      },
      aulaSex: {
        type: Sequelize.BOOLEAN
      },
      aulaSab: {
        type: Sequelize.BOOLEAN
      },
      ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Alunos');
  }
};
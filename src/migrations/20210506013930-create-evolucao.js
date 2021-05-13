module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Evolucao', {
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
      idAluno: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Alunos',
          key: 'id'
        }            
      },    
      data: {
        allowNull: false,
        type: Sequelize.DATE
      },
      comoChegou: {
        type: Sequelize.TEXT
      },
      condutasUtilizadas: {
        type: Sequelize.TEXT
      },
      aparelhosUtilizados: {
        type: Sequelize.TEXT
      },
      comoSaiu: {
        type: Sequelize.TEXT
      },
      orientacoesDomiciliares: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Evolucao');
  }
};
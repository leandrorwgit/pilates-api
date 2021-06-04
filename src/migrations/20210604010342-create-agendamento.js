'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Agendamento', {
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
          model: 'Usuario',
          key: 'id'
        }            
      },    
      idAluno: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Aluno',
          key: 'id'
        }            
      },    
      dataHoraInicio: {
        allowNull: false,
        type: Sequelize.DATE
      },
      duracao: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },            
      descricao: {
        type: Sequelize.TEXT
      },
      situacao: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Agendamento');
  }
};
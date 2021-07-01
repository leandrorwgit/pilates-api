'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContasReceberPagamento', {
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
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Aluno',
          key: 'id'
        }            
      },    
      dataPagamento: {
        allowNull: false,
        type: Sequelize.DATE
      },      
      valorPago: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },      
      formaPagamento: {
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
    await queryInterface.dropTable('ContasReceberPagamento');
  }
};
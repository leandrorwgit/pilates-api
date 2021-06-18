'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Configuracao', {
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
      duracaoPadraoAula: {
        allowNull: false,
        type: Sequelize.INTEGER,
        default: 50
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
    await queryInterface.dropTable('Configuracao');
  }
};
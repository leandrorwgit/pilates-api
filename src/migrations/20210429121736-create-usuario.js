'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      empresa: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cpf: {
        allowNull: true,
        type: Sequelize.STRING,
      },      
      ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },            
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, DataTypes) => {
    return queryInterface.dropTable('Usuario');
  }
};

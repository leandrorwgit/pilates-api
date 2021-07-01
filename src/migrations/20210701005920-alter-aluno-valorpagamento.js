'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Aluno', 'valorPagamento', { type: Sequelize.DECIMAL(10,2) });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Aluno', 'valorPagamento');
  }
};
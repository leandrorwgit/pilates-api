'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Aluno', 'aulaHorarioInicioSeg', { type: Sequelize.STRING });
    await queryInterface.addColumn('Aluno', 'aulaHorarioInicioTer', { type: Sequelize.STRING });
    await queryInterface.addColumn('Aluno', 'aulaHorarioInicioQua', { type: Sequelize.STRING });
    await queryInterface.addColumn('Aluno', 'aulaHorarioInicioQui', { type: Sequelize.STRING });
    await queryInterface.addColumn('Aluno', 'aulaHorarioInicioSex', { type: Sequelize.STRING });
    await queryInterface.addColumn('Aluno', 'aulaHorarioInicioSab', { type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Aluno', 'aulaHorarioInicioSeg');
    await queryInterface.removeColumn('Aluno', 'aulaHorarioInicioTer');
    await queryInterface.removeColumn('Aluno', 'aulaHorarioInicioQua');
    await queryInterface.removeColumn('Aluno', 'aulaHorarioInicioQui');
    await queryInterface.removeColumn('Aluno', 'aulaHorarioInicioSex');
    await queryInterface.removeColumn('Aluno', 'aulaHorarioInicioSab');
  }
};
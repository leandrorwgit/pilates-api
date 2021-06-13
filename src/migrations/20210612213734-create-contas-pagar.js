module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContasPagar', {
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
      descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      diaVencimento: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },      
      formaPagamento: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('ContasPagar');
  }
};
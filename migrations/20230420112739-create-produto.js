'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_func: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nome_prod: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      valor_compra: {
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
      },
      valor_venda: {
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
      },
      descricao: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
  }
};
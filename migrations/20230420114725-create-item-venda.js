'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('item_vendas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_prod: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cod_func: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cod_venda: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      valor_unitario: {
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
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
    await queryInterface.dropTable('item_vendas');
  }
};
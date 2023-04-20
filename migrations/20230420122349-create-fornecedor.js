'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fornecedores', {
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
      cnpj: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      nome_empresa: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      endereco: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      site: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING(250),
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
    await queryInterface.dropTable('fornecedores');
  }
};
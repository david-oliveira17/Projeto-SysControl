'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('funcionarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING(100),
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
      telefone: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cargo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      data_nasc: {
        type: Sequelize.DATE,
        allowNull: false
      },
      login: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING(255),
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
    await queryInterface.dropTable('funcionarios');
  }
};
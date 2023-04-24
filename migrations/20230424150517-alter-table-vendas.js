'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('vendas', {
      fields: ['cod_func'],   //Campo da tabela de origem
      type: 'foreign key',
      name: 'vendas_funcionarios_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'funcionarios',  //Tabela estrangeira
           field: 'id'       //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('vendas', 'vendas_funcionarios_fk')
  }
};

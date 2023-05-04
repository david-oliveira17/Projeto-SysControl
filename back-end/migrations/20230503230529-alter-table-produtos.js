'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('produtos', {
      fields: ['cod_forn'],   //Nome do campo que sera atribuida a foreign key
      type: 'foreign key',
      name: 'produtos_fornecedores_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'fornecedores',  //Tabela que sera herdada a chave
           field: 'id'       //Campo que sera usado da outra tabela
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('produtos', 'produtos_fornecedores_fk')
  }
};

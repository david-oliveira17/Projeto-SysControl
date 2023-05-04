'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('estoques', {
      fields: ['cod_prod'],   //Nome do campo desta tabela que sera atribuida a foreign key
      type: 'foreign key',
      name: 'estoques_produtos_fk',  //Nome da chave estrangeira(deve ser unico no BD)
      references: {
           table: 'produtos',  //Tabela que sera herdada a chave
           field: 'id'       //Campo que sera usado da outra tabela
      },
      onDelete: 'RESTRICT',   //Não deixa apagar uma city em uso na customer
      onUpdate: 'CASCADE'     //Atualiza city_id em customer se id em city mudar
     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('estoques', 'estoques_produtos_fk')
  }
};

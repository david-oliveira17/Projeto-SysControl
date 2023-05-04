'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Funcionario, {
        foreignKey: 'cod_func',     //Nome do campo na tabela de origem
        targetKey: 'id',           //Nome do campo na tabela de destino
        as: 'funcionario'                 //Nome do atributo para exibição
   })

   this.belongsToMany(models.Produto, {
    through: 'item_vendas',    //Tabela intermediaria
    foreignKey: 'cod_venda',   //Chave estrangeira da tabela intermediária
    otherKey: 'cod_prod',          //Outra chave da tabela intermediaria
    as: 'produtos'                   //Nome do campo de associação (plural)
  })
    }
  }
  Venda.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cod_func: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valor_total: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false
    },
    data_venda: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Venda',
    tableName: 'vendas'
  });
  return Venda;
};
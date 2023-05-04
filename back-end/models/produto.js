'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Fornecedor, {  //Nome da outra tabela
        foreignKey: 'cod_forn',     //Nome do campo de associação nesta tabela
        targetKey: 'id',           //Nome do campo de id da outra tabela
        as: 'fornecedor'             //Nome do atributo para exibição
   })

   this.belongsToMany(models.Venda, {
    through: 'item_vendas',    //Tabela intermediaria
    foreignKey: 'cod_prod',   //Chave estrangeira da tabela intermediária
    otherKey: 'cod_venda',          //Outra chave da tabela intermediaria
    as: 'vendas'                   //Nome do campo de associação (plural)
  })
    }
  }
  Produto.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cod_forn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome_prod: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    valor_compra: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    valor_venda: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'produtos'
  });
  return Produto;
};
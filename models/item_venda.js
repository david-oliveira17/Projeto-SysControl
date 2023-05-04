'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemVenda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Venda, {  //Nome da outra tabela
        foreignKey: 'cod_venda',     //Nome do campo de associação nesta tabela
        targetKey: 'id',           //Nome do campo de id da outra tabela
        as: 'venda'                 //Nome do atributo para exibição
      })

      this.belongsTo(models.Produto, {  //Nome da outra tabela
        foreignKey: 'cod_prod',     //Nome do campo de associação nesta tabela
        targetKey: 'id',           //Nome do campo de id da outra tabela
        as: 'produto'                 //Nome do atributo para exibição
      })
    }
  }
  ItemVenda.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cod_prod: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cod_venda: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valor_unitario: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ItemVenda',
    tableName: 'item_vendas'
  });
  return ItemVenda;
};
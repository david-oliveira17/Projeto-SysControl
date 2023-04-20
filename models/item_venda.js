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
      // define association here
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
    cod_func: {
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
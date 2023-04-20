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
      // define association here
    }
  }
  Produto.init({
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
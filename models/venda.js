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
      // define association here
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
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estoque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estoque.init({
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
    cod_prod: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Estoque',
    tableName: 'estoques'
  });
  return Estoque;
};
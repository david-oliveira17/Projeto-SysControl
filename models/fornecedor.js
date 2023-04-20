'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fornecedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fornecedor.init({
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
    cnpj: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    nome_empresa: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    site: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Fornecedor',
    tableName: 'fornecedores'
  });
  return Fornecedor;
};
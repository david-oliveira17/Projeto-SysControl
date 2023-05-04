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
      this.hasMany(models.Produto, { //Nome da tabela associada
        foreignKey: 'cod_forn',  //Campo que sera associado na outra tabela
        sourceKey: 'id',        //Campo da tabela local
        as: 'produtos'         //Nome do campo de associação(plural)
      })
    }
  }
  Fornecedor.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
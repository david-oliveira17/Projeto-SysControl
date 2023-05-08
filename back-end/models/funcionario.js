'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Venda, {
        foreignKey: 'cod_func',  //Campo da tabela estrangeira
        sourceKey: 'id',        //Campo da tabela local
        as: 'vendas'         //Nome do campo de associação(plural)
      })
    }
  }
  Funcionario.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome: {
      type: DataTypes.STRING(100),
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
    telefone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cargo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    data_nasc: {
      type: DataTypes.DATE,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Funcionario',
    tableName: 'funcionarios',

    // Esconde o campo "password" no retrieve e no retrieveOne
    defaultScope: {
      attributes: {
        exclude: ['senha']
      }
    },
    scopes: {
      // Inclui o campo "password" (necessário no login)
      withPassword: {
        attributes: {
          include: ['senha']
        }
      }
    }
  });
  return Funcionario;
};
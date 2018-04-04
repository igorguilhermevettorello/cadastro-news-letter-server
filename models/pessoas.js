'use strict';
module.exports = (sequelize, DataTypes) => {
  var pessoas = sequelize.define('pessoas', {
    id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    imagem: DataTypes.STRING,
    usuario_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  pessoas.associate = function(models) {
    // associations can be defined here
  };
  return pessoas;
};
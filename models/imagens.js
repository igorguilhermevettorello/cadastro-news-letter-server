'use strict';
module.exports = (sequelize, DataTypes) => {
  var imagens = sequelize.define('imagens', {
    id: DataTypes.INTEGER,
    descricao: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  imagens.associate = function(models) {
    // associations can be defined here
  };
  return imagens;
};
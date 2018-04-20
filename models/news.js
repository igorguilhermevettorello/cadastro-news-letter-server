'use strict';
module.exports = (sequelize, DataTypes) => {
  var news = sequelize.define('news', {
    id: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN,
    descricao: DataTypes.STRING,
    imagem: DataTypes.STRING,
    width: DataTypes.STRING,
    height: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  news.associate = function(models) {
    // associations can be defined here
  };
  return news;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var menus = sequelize.define('menus', {
    descricao: DataTypes.STRING,
    controller: DataTypes.STRING,
    acao: DataTypes.STRING,
    menu_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  menus.associate = function(models) {
    // associations can be defined here
  };
  return menus;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var coordenadas = sequelize.define('coordenadas', {
    id: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN,
    coordenada1: DataTypes.STRING,
    coordenada2: DataTypes.STRING,
    coordenada3: DataTypes.STRING,
    coordenada4: DataTypes.STRING,
    link: DataTypes.STRING,
    new_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  coordenadas.associate = function(models) {
    // associations can be defined here
  };
  return coordenadas;
};
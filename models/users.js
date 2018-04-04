'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    id: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      descricao: {
        type: Sequelize.STRING
      },
      controller: {
        type: Sequelize.STRING
      },
      acao: {
        type: Sequelize.STRING
      },
      menu_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "menus",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('menus');
  }
};
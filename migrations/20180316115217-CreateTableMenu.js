'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('menus', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descricao: Sequelize.STRING,
      controller: Sequelize.STRING,
      acao: Sequelize.STRING,
      menu_id : {
        type: Sequelize.INTEGER,
        references: {
          model: "menus",
          key: "id"
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('menus');
  }
};

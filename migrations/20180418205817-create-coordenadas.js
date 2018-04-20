'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('coordenadas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coordenada1: {
        type: Sequelize.STRING
      },
      coordenada2: {
        type: Sequelize.STRING
      },
      coordenada3: {
        type: Sequelize.STRING
      },
      coordenada4: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      new_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "news",
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
    return queryInterface.dropTable('coordenadas');
  }
};
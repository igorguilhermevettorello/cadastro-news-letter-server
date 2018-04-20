'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('news', 'imagem', {
      type: Sequelize.STRING,
      after: "descricao"
    });

    queryInterface.addColumn('news', 'width', {
      type: Sequelize.STRING,
      after: "imagem"
    });

    queryInterface.addColumn('news', 'height', {
      type: Sequelize.STRING,
      after: "width"
    });

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('habitacoes', 'moradia_atual', {
      type: Sequelize.STRING,
      after: "cooperativa_nome"
    });

    queryInterface.addColumn('habitacoes', 'ocupacao', {
      type: Sequelize.STRING,
      after: "moradia_atual"
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

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('habitacoes', 'endereco', {
      type: Sequelize.STRING,
      after: "empresa_2"
    });

    queryInterface.addColumn('habitacoes', 'numero', {
      type: Sequelize.STRING,
      after: "endereco"
    });

    queryInterface.addColumn('habitacoes', 'bairro', {
      type: Sequelize.STRING,
      after: "numero"
    });

    queryInterface.addColumn('habitacoes', 'telefones', {
      type: Sequelize.STRING,
      after: "bairro"
    });

    queryInterface.addColumn('habitacoes', 'titular', {
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

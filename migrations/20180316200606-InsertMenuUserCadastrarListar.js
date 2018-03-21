'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.bulkInsert('menus', [
      {descricao: 'Cadastrar', controller: 'usuarios', acao:'cadastrar', createdAt: new Date, updatedAt: new Date, menu_id: 2},
      {descricao: 'Listar', controller: 'usuarios', acao:'listar', createdAt: new Date, updatedAt: new Date, menu_id: 2},
      {descricao: 'Editar', controller: 'pessoas', acao:'view', createdAt: new Date, updatedAt: new Date, menu_id: 3},
      {descricao: 'Cadastrar', controller: 'menu', acao:'cadastrar', createdAt: new Date, updatedAt: new Date, menu_id: 4},
      {descricao: 'Listar', controller: 'menu', acao:'listar', createdAt: new Date, updatedAt: new Date, menu_id: 4}
    ]);
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

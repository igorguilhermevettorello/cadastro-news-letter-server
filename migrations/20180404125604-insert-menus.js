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
      {descricao: 'Usuários', createdAt: new Date, updatedAt: new Date, menu_id: 1},
      {descricao: 'Perfis', createdAt: new Date, updatedAt: new Date, menu_id: 1},
      {descricao: 'Menus', createdAt: new Date, updatedAt: new Date, menu_id: 1},
      {descricao: 'Cadastrar', controller: 'usuarios', acao:'cadastrar', createdAt: new Date, updatedAt: new Date, menu_id: 2},
      {descricao: 'Listar', controller: 'usuarios', acao:'listar', createdAt: new Date, updatedAt: new Date, menu_id: 2},
      {descricao: 'Editar', controller: 'perfil', createdAt: new Date, updatedAt: new Date, menu_id: 3},
      {descricao: 'Cadastrar', controller: 'menus', acao:'cadastrar', createdAt: new Date, updatedAt: new Date, menu_id: 4},
      {descricao: 'Listar', controller: 'menus', acao:'listar', createdAt: new Date, updatedAt: new Date, menu_id: 4}
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

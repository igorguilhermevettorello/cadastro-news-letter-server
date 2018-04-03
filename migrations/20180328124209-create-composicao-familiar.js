'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('composicao_familiar', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_completo: {
        type: Sequelize.STRING
      },
      vinculo: {
        type: Sequelize.STRING
      },
      dt_nascimento: {
        type: Sequelize.DATE
      },
      cpf_rg_cn: {
        type: Sequelize.STRING
      },
      escolaridade: {
        type: Sequelize.STRING
      },
      atividade: {
        type: Sequelize.STRING
      },
      renda: {
        type: Sequelize.DECIMAL(10,2)
      },
      habitacao_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "habitacoes",
          key: "id"
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('composicao_familiar');
  }
};
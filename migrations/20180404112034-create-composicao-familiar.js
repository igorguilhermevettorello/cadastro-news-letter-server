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
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
      cpf: {
        type: Sequelize.STRING
      },
      rg: {
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
      pcd: {
        type: Sequelize.BOOLEAN
      },
      pcd_qual: {
        type: Sequelize.STRING
      },
      doenca_grave: {
        type: Sequelize.BOOLEAN
      },
      doenca_qual: {
        type: Sequelize.STRING
      },
      bolsa_familia: {
        type: Sequelize.BOOLEAN
      },
      bolsa_familia_valor: {
        type: Sequelize.DECIMAL(10,2)
      },
      bpc: {
        type: Sequelize.BOOLEAN
      },
      bpc_valor: {
        type: Sequelize.DECIMAL(10,2)
      },
      inscrito_cadastro_unico: {
        type: Sequelize.BOOLEAN
      },
      inscricao_cadastro_unico: {
        type: Sequelize.STRING
      },
      habitacao_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "habitacoes",
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
    return queryInterface.dropTable('composicao_familiars');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('habitacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titular_1: {
        type: Sequelize.STRING
      },
      naturalidade_1: {
        type: Sequelize.STRING
      },
      pai_1: {
        type: Sequelize.STRING
      },
      mae_1: {
        type: Sequelize.STRING
      },
      nascimento_1: {
        type: Sequelize.DATE
      },
      estado_civil_1: {
        type: Sequelize.STRING
      },
      escolaridade_1: {
        type: Sequelize.STRING
      },
      cpf_1: {
        type: Sequelize.STRING
      },
      rg_1: {
        type: Sequelize.STRING
      },
      atividade_1: {
        type: Sequelize.STRING
      },
      renda_1: {
        type: Sequelize.DECIMAL(10,2)
      },
      informal_1: {
        type: Sequelize.BOOLEAN
      },
      formal_1: {
        type: Sequelize.BOOLEAN
      },
      empresa_1: {
        type: Sequelize.STRING
      },
      titular_2: {
        type: Sequelize.STRING
      },
      naturalidade_2: {
        type: Sequelize.STRING
      },
      pai_2: {
        type: Sequelize.STRING
      },
      mae_2: {
        type: Sequelize.STRING
      },
      nascimento_2: {
        type: Sequelize.DATE
      },
      estado_civil_2: {
        type: Sequelize.STRING
      },
      escolaridade_2: {
        type: Sequelize.STRING
      },
      cpf_2: {
        type: Sequelize.STRING
      },
      rg_2: {
        type: Sequelize.STRING
      },
      atividade_2: {
        type: Sequelize.STRING
      },
      renda_2: {
        type: Sequelize.DECIMAL(10,2)
      },
      informal_2: {
        type: Sequelize.BOOLEAN
      },
      formal_2: {
        type: Sequelize.BOOLEAN
      },
      empresa_2: {
        type: Sequelize.STRING
      },
      tempo_moradia_anos: {
        type: Sequelize.INTEGER
      },
      tempo_moradia_meses: {
        type: Sequelize.INTEGER
      },
      procedencia_municipio: {
        type: Sequelize.STRING
      },
      procedencia_uf: {
        type: Sequelize.STRING
      },
      cooperativa_inscricao: {
        type: Sequelize.BOOLEAN
      },
      moradia_atual: {
        type: Sequelize.STRING
      },
      familia_constituida: {
        type: Sequelize.BOOLEAN
      },
      idoso_sozinho: {
        type: Sequelize.BOOLEAN
      },
      pcd_sozinho: {
        type: Sequelize.BOOLEAN
      },
      pcd: {
        type: Sequelize.BOOLEAN
      },
      pcd_cadeirante: {
        type: Sequelize.BOOLEAN
      },
      pcd_familia: {
        type: Sequelize.BOOLEAN
      },
      pcd_chefe_familia: {
        type: Sequelize.BOOLEAN
      },
      pcd_qual: {
        type: Sequelize.STRING
      },
      doenca_grave: {
        type: Sequelize.BOOLEAN
      },
      doenca_grave_familia: {
        type: Sequelize.BOOLEAN
      },
      doenca_grave_chefe_familia: {
        type: Sequelize.BOOLEAN
      },
      doenca_grave_qual: {
        type: Sequelize.STRING
      },
      bolsa_familia: {
        type: Sequelize.BOOLEAN
      },
      bolsa_familia_valor: {
        type: Sequelize.DECIMAL(10,2)
      },
      inscrito_cadastro_unico: {
        type: Sequelize.BOOLEAN
      },
      inscricao_cadastro_unico: {
        type: Sequelize.STRING
      },
      bcp: {
        type: Sequelize.BOOLEAN
      },
      bcp_valor: {
        type: Sequelize.DECIMAL(10,2)
      },
      beneficio_idoso_deficiente: {
        type: Sequelize.BOOLEAN
      },
      cras: {
        type: Sequelize.BOOLEAN
      },
      caps: {
        type: Sequelize.BOOLEAN
      },
      associacao_moradores: {
        type: Sequelize.BOOLEAN
      },
      comprovante_residencia: {
        type: Sequelize.BOOLEAN
      },
      comprovante_tempo_campo_bom: {
        type: Sequelize.BOOLEAN
      },
      comprovante_cpf_rg: {
        type: Sequelize.BOOLEAN
      },
      comprovante_renda: {
        type: Sequelize.BOOLEAN
      },
      comprovante_deficiencia_doenca_grave: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('habitacoes');
  }
};
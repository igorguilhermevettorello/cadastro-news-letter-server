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
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
      viculo_titular_1_com_titular_2: {
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
      pcd_1: {
        type: Sequelize.BOOLEAN
      },
      pcd_qual_1: {
        type: Sequelize.STRING
      },
      doenca_grave_1: {
        type: Sequelize.BOOLEAN
      },
      doenca_qual_1: {
        type: Sequelize.STRING
      },
      bolsa_familia_1: {
        type: Sequelize.BOOLEAN
      },
      bolsa_familia_valor_1: {
        type: Sequelize.DECIMAL(10,2)
      },
      bpc_1: {
        type: Sequelize.BOOLEAN
      },
      bpc_valor_1: {
        type: Sequelize.DECIMAL(10,2)
      },
      inscrito_cadastro_unico_1: {
        type: Sequelize.BOOLEAN
      },
      inscricao_cadastro_unico_1: {
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
      viculo_titular_2_com_titular_1: {
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
      pcd_2: {
        type: Sequelize.BOOLEAN
      },
      pcd_qual_2: {
        type: Sequelize.STRING
      },
      doenca_grave_2: {
        type: Sequelize.BOOLEAN
      },
      doenca_qual_2: {
        type: Sequelize.STRING
      },
      bolsa_familia_2: {
        type: Sequelize.BOOLEAN
      },
      bolsa_familia_valor_2: {
        type: Sequelize.DECIMAL(10,2)
      },
      bpc_2: {
        type: Sequelize.BOOLEAN
      },
      bpc_valor_2: {
        type: Sequelize.DECIMAL(10,2)
      },
      inscrito_cadastro_unico_2: {
        type: Sequelize.BOOLEAN
      },
      inscricao_cadastro_unico_2: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING
      },
      telefones: {
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
      cooperativa_nome: {
        type: Sequelize.STRING
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
      observacao: {
        type: Sequelize.STRING
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
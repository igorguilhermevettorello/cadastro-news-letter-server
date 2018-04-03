'use strict';
module.exports = (sequelize, DataTypes) => {
  var ComposicaoFamiliar = sequelize.define('composicao_familiar', {
    id: DataTypes.INTEGER,
    nome_completo: DataTypes.STRING,
    vinculo: DataTypes.STRING,
    dt_nascimento: DataTypes.DATE,
    cpf_rg_cn: DataTypes.STRING,
    escolaridade: DataTypes.STRING,
    atividade: DataTypes.STRING,
    renda: DataTypes.DECIMAL,
    habitacao_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  ComposicaoFamiliar.associate = function(models) {
    // associations can be defined here
  };
  return ComposicaoFamiliar;
};
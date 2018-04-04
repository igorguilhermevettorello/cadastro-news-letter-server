'use strict';
module.exports = (sequelize, DataTypes) => {
  var composicao_familiar = sequelize.define('composicao_familiar', {
    id: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN,
    nome_completo: DataTypes.STRING,
    vinculo: DataTypes.STRING,
    dt_nascimento: DataTypes.DATE,
    cpf: DataTypes.STRING,
    rg: DataTypes.STRING,
    escolaridade: DataTypes.STRING,
    atividade: DataTypes.STRING,
    renda: DataTypes.DECIMAL,
    pcd: DataTypes.BOOLEAN,
    pcd_qual: DataTypes.STRING,
    doenca_grave: DataTypes.BOOLEAN,
    doenca_qual: DataTypes.STRING,
    bolsa_familia: DataTypes.BOOLEAN,
    bolsa_familia_valor: DataTypes.DECIMAL,
    bpc: DataTypes.BOOLEAN,
    bpc_valor: DataTypes.DECIMAL,
    inscrito_cadastro_unico: DataTypes.BOOLEAN,
    inscricao_cadastro_unico: DataTypes.STRING,
    habitacao_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  composicao_familiar.associate = function(models) {
    // associations can be defined here
  };
  return composicao_familiar;
};
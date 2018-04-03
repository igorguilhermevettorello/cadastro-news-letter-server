function habitacoesDAO(connection) {
  this._connection = connection;
}

habitacoesDAO.prototype.save = function(habitacao, id, callback) {

  let query = null;
  if (id === null) {
    query = `insert into habitacoes (titular_1, naturalidade_1, pai_1, mae_1, nascimento_1, estado_civil_1, escolaridade_1, cpf_1, rg_1, atividade_1, renda_1, informal_1, formal_1, empresa_1, titular_2, naturalidade_2, pai_2, mae_2, nascimento_2, estado_civil_2, escolaridade_2, cpf_2, rg_2, atividade_2, renda_2, informal_2, formal_2, empresa_2, endereco, numero, bairro, telefones, tempo_moradia_anos, tempo_moradia_meses, procedencia_municipio, procedencia_uf, cooperativa_inscricao, titular, ocupacao, moradia_atual, familia_constituida, idoso_sozinho, pcd_sozinho, pcd, pcd_cadeirante, pcd_familia, pcd_chefe_familia, pcd_qual, doenca_grave, doenca_grave_familia, doenca_grave_chefe_familia, doenca_grave_qual, bolsa_familia, bolsa_familia_valor, inscrito_cadastro_unico, inscricao_cadastro_unico, bcp, bcp_valor, beneficio_idoso_deficiente, cras, caps, associacao_moradores, comprovante_residencia, comprovante_tempo_campo_bom, comprovante_cpf_rg, comprovante_renda, comprovante_deficiencia_doenca_grave, observacao, createdAt, updatedAt)
                             values ('${habitacao.titular_1}',
                                     '${habitacao.naturalidade_1}',
                                     '${habitacao.pai_1}',
                                     '${habitacao.mae_1}',
                                      ${habitacao.nascimento_1},
                                     '${habitacao.estado_civil_1}',
                                     '${habitacao.escolaridade_1}',
                                     '${habitacao.cpf_1}',
                                     '${habitacao.rg_1}',
                                     '${habitacao.atividade_1}',
                                      ${habitacao.renda_1},
                                      ${habitacao.informal_1},
                                      ${habitacao.formal_1},
                                     '${habitacao.empresa_1}',
                                     '${habitacao.titular_2}',
                                     '${habitacao.naturalidade_2}',
                                     '${habitacao.pai_2}',
                                     '${habitacao.mae_2}',
                                      ${habitacao.nascimento_2},
                                     '${habitacao.estado_civil_2}',
                                     '${habitacao.escolaridade_2}',
                                     '${habitacao.cpf_2}',
                                     '${habitacao.rg_2}',
                                     '${habitacao.atividade_2}',
                                      ${habitacao.renda_2},
                                      ${habitacao.informal_2},
                                      ${habitacao.formal_2},
                                     '${habitacao.empresa_2}',
                                     '${habitacao.endereco}',
                                     '${habitacao.numero}',
                                     '${habitacao.bairro}',
                                     '${habitacao.telefones}',
                                      ${habitacao.tempo_moradia_anos},
                                      ${habitacao.tempo_moradia_meses},
                                     '${habitacao.procedencia_municipio}',
                                     '${habitacao.procedencia_uf}',
                                      ${habitacao.cooperativa_inscricao},
                                     '${habitacao.titular}',
                                     '${habitacao.ocupacao}',
                                     '${habitacao.moradia_atual}',
                                      ${habitacao.familia_constituida},
                                      ${habitacao.idoso_sozinho},
                                      ${habitacao.pcd_sozinho},
                                      ${habitacao.pcd},
                                      ${habitacao.pcd_cadeirante},
                                      ${habitacao.pcd_familia},
                                      ${habitacao.pcd_chefe_familia},
                                     '${habitacao.pcd_qual}',
                                      ${habitacao.doenca_grave},
                                      ${habitacao.doenca_grave_familia},
                                      ${habitacao.doenca_grave_chefe_familia},
                                     '${habitacao.doenca_grave_qual}',
                                      ${habitacao.bolsa_familia},
                                      ${habitacao.bolsa_familia_valor},
                                      ${habitacao.inscrito_cadastro_unico},
                                     '${habitacao.inscricao_cadastro_unico}',
                                      ${habitacao.bcp},
                                      ${habitacao.bcp_valor},
                                      ${habitacao.beneficio_idoso_deficiente},
                                      ${habitacao.cras},
                                      ${habitacao.caps},
                                      ${habitacao.associacao_moradores},
                                      ${habitacao.comprovante_residencia},
                                      ${habitacao.comprovante_tempo_campo_bom},
                                      ${habitacao.comprovante_cpf_rg},
                                      ${habitacao.comprovante_renda},
                                      ${habitacao.comprovante_deficiencia_doenca_grave},
                                     '${habitacao.observacao}',
                                     now(),
                                     now());`;
  } else {
   query = `update habitacoes
               set titular_1                              = '${habitacao.titular_1}',
                   naturalidade_1                         = '${habitacao.naturalidade_1}',
                   pai_1                                  = '${habitacao.pai_1}',
                   mae_1                                  = '${habitacao.mae_1}',
                   nascimento_1                           =  ${habitacao.nascimento_1},
                   estado_civil_1                         = '${habitacao.estado_civil_1}',
                   escolaridade_1                         = '${habitacao.escolaridade_1}',
                   cpf_1                                  = '${habitacao.cpf_1}',
                   rg_1                                   = '${habitacao.rg_1}',
                   atividade_1                            = '${habitacao.atividade_1}',
                   renda_1                                =  ${habitacao.renda_1},
                   informal_1                             =  ${habitacao.informal_1},
                   formal_1                               =  ${habitacao.formal_1},
                   empresa_1                              = '${habitacao.empresa_1}',
                   titular_2                              = '${habitacao.titular_2}',
                   naturalidade_2                         = '${habitacao.naturalidade_2}',
                   pai_2                                  = '${habitacao.pai_2}',
                   mae_2                                  = '${habitacao.mae_2}',
                   nascimento_2                           =  ${habitacao.nascimento_2},
                   estado_civil_2                         = '${habitacao.estado_civil_2}',
                   escolaridade_2                         = '${habitacao.escolaridade_2}',
                   cpf_2                                  = '${habitacao.cpf_2}',
                   rg_2                                   = '${habitacao.rg_2}',
                   atividade_2                            = '${habitacao.atividade_2}',
                   renda_2                                =  ${habitacao.renda_2},
                   informal_2                             =  ${habitacao.informal_2},
                   formal_2                               =  ${habitacao.formal_2},
                   empresa_2                              = '${habitacao.empresa_2}',
                   endereco                               = '${habitacao.endereco}',
                   numero                                 = '${habitacao.numero}',
                   bairro                                 = '${habitacao.bairro}',
                   telefones                              = '${habitacao.telefones}',
                   tempo_moradia_anos                     =  ${habitacao.tempo_moradia_anos},
                   tempo_moradia_meses                    =  ${habitacao.tempo_moradia_meses},
                   procedencia_municipio                  = '${habitacao.procedencia_municipio}',
                   procedencia_uf                         = '${habitacao.procedencia_uf}',
                   cooperativa_inscricao                  =  ${habitacao.cooperativa_inscricao},
                   titular                                = '${habitacao.titular}',
                   ocupacao                               = '${habitacao.ocupacao}',
                   moradia_atual                          = '${habitacao.moradia_atual}',
                   familia_constituida                    =  ${habitacao.familia_constituida},
                   idoso_sozinho                          =  ${habitacao.idoso_sozinho},
                   pcd_sozinho                            =  ${habitacao.pcd_sozinho},
                   pcd                                    =  ${habitacao.pcd},
                   pcd_cadeirante                         =  ${habitacao.pcd_cadeirante},
                   pcd_familia                            =  ${habitacao.pcd_familia},
                   pcd_chefe_familia                      =  ${habitacao.pcd_chefe_familia},
                   pcd_qual                               = '${habitacao.pcd_qual}',
                   doenca_grave                           =  ${habitacao.doenca_grave},
                   doenca_grave_familia                   =  ${habitacao.doenca_grave_familia},
                   doenca_grave_chefe_familia             =  ${habitacao.doenca_grave_chefe_familia},
                   doenca_grave_qual                      = '${habitacao.doenca_grave_qual}',
                   bolsa_familia                          =  ${habitacao.bolsa_familia},
                   bolsa_familia_valor                    =  ${habitacao.bolsa_familia_valor},
                   inscrito_cadastro_unico                =  ${habitacao.inscrito_cadastro_unico},
                   inscricao_cadastro_unico               = '${habitacao.inscricao_cadastro_unico}',
                   bcp                                    =  ${habitacao.bcp},
                   bcp_valor                              =  ${habitacao.bcp_valor},
                   beneficio_idoso_deficiente             =  ${habitacao.beneficio_idoso_deficiente},
                   cras                                   =  ${habitacao.cras},
                   caps                                   =  ${habitacao.caps},
                   associacao_moradores                   =  ${habitacao.associacao_moradores},
                   comprovante_residencia                 =  ${habitacao.comprovante_residencia},
                   comprovante_tempo_campo_bom            =  ${habitacao.comprovante_tempo_campo_bom},
                   comprovante_cpf_rg                     =  ${habitacao.comprovante_cpf_rg},
                   comprovante_renda                      =  ${habitacao.comprovante_renda},
                   comprovante_deficiencia_doenca_grave   =  ${habitacao.comprovante_deficiencia_doenca_grave},
                   observacao                             = '${habitacao.observacao}',
                   updatedAt                              = now()
             where id = ${habitacao.id};`;
  }

  this._connection.query(query, callback);
}

habitacoesDAO.prototype.list = function(callback) {
  this._connection.query('select * from habitacoes',callback);
}

habitacoesDAO.prototype.getById = function (id,callback) {
  this._connection.query("select * from habitacoes where id = ?",[id],callback);
}

habitacoesDAO.prototype.getPaginate = function (limit, callback) {
  this._connection.query(`select ceil(count(*) / ?) as total from habitacoes`, [limit], callback);
}

habitacoesDAO.prototype.getListPaginate = function (page, limit, callback) {
  this._connection.query(`select h.id as id,
                                 h.titular_1 as titular_1,
                                 h.titular_2 as titular_2
                            from habitacoes h
                           order by h.id asc
                           limit ?,?`, [page, limit], callback);
}

habitacoesDAO.prototype.verificarCpf = function (cpf1, cpf2, callback) {
  let query = null;
  if (cpf2 != "") {
    query = `select *
               from habitacoes
              where cpf_1 = '${cpf1}'
                 or cpf_2 = '${cpf1}'
                 or cpf_1 = '${cpf2}'
                 or cpf_2 = '${cpf2}'`;
  } else {
    query = `select *
               from habitacoes
              where cpf_1 = '${cpf1}'
                 or cpf_2 = '${cpf1}'`;
  }

  this._connection.query(query, callback);
}



module.exports = function(){
    return habitacoesDAO;
};
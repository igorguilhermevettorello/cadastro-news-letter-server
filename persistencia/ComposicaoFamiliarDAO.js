function composicaoFamiliarDAO(connection) {
  this._connection = connection;
}

composicaoFamiliarDAO.prototype.save = function(composicaoFamiliar, callback) {
  let query = composicaoFamiliar.map(item => {
    if (item.id === null) {
      return `insert into composicao_familiar (nome_completo,
                                               vinculo,
                                               dt_nascimento,
                                               cpf_rg_cn,
                                               escolaridade,
                                               atividade,
                                               renda,
                                               habitacao_id,
                                               createdAt,
                                               updatedAt)
                                      values ( '${item.nome_completo}',
                                               '${item.vinculo}',
                                                ${item.dt_nascimento},
                                               '${item.cpf_rg_cn}',
                                               '${item.escolaridade}',
                                               '${item.atividade}',
                                               ${item.renda},
                                               ${item.habitacao_id},
                                               now(),
                                               now());`;
    } else {
      return `update composicao_familiar
                 set nome_completo  = '${item.nome_completo}',
                     vinculo        = '${item.vinculo}',
                     dt_nascimento  =  ${item.dt_nascimento},
                     cpf_rg_cn      = '${item.cpf_rg_cn}',
                     escolaridade   = '${item.escolaridade}',
                     atividade      = '${item.atividade}',
                     renda          = ${item.renda},
                     habitacao_id   = ${item.habitacao_id},
                     updatedAt      = now()
               where id = ${item.id};`;
    }
  }).join(``);

  this._connection.query(query, callback);
}

composicaoFamiliarDAO.prototype.list = function(callback) {
  this._connection.query('select * from composicao_familiar',callback);
}

composicaoFamiliarDAO.prototype.getByHabitacaoId = function (id,callback) {
  this._connection.query(`select *
                            from composicao_familiar
                           where habitacao_id = ?
                           order by id asc`, [id], callback);
}

module.exports = function(){
    return composicaoFamiliarDAO;
};
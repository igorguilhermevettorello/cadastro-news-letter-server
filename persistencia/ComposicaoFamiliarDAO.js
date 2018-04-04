function composicaoFamiliarDAO(connection) {
  this._connection = connection;
}

composicaoFamiliarDAO.prototype.save = function(composicaoFamiliar, callback) {
  let query = composicaoFamiliar.map(item => {
    if (item.id === null) {
      return `insert into composicao_familiar ( nome_completo,
                                                vinculo,
                                                dt_nascimento,
                                                cpf,
                                                rg,
                                                escolaridade,
                                                atividade,
                                                renda,
                                                pcd,
                                                pcd_qual,
                                                doenca_grave,
                                                doenca_qual,
                                                bolsa_familia,
                                                bolsa_familia_valor,
                                                bpc,
                                                bpc_valor,
                                                inscrito_cadastro_unico,
                                                inscricao_cadastro_unico,
                                                habitacao_id,
                                                createdAt,
                                                updatedAt )
                                       values ( '${item.nome_completo}',
                                                '${item.vinculo}',
                                                 ${item.dt_nascimento},
                                                '${item.cpf}',
                                                '${item.rg}',
                                                '${item.escolaridade}',
                                                '${item.atividade}',
                                                 ${item.renda},
                                                 ${item.pcd},
                                                '${item.pcd_qual}',
                                                 ${item.doenca_grave},
                                                '${item.doenca_qual}',
                                                 ${item.bolsa_familia},
                                                 ${item.bolsa_familia_valor},
                                                 ${item.bpc},
                                                 ${item.bpc_valor},
                                                 ${item.inscrito_cadastro_unico},
                                                '${item.inscricao_cadastro_unico}',
                                                 ${item.habitacao_id},
                                                now(),
                                                now());`;
    } else {
      return `update composicao_familiar
                 set nome_completo            = '${item.nome_completo}',
                     vinculo                  = '${item.vinculo}',
                     dt_nascimento            =  ${item.dt_nascimento},
                     cpf                      = '${item.cpf}',
                     rg                       = '${item.rg}',
                     escolaridade             = '${item.escolaridade}',
                     atividade                = '${item.atividade}',
                     renda                    =  ${item.renda},
                     pcd                      =  ${item.pcd},
                     pcd_qual                 = '${item.pcd_qual}',
                     doenca_grave             =  ${item.doenca_grave},
                     doenca_qual              = '${item.doenca_qual}',
                     bolsa_familia            =  ${item.bolsa_familia},
                     bolsa_familia_valor      =  ${item.bolsa_familia_valor},
                     bpc                      =  ${item.bpc},
                     bpc_valor                =  ${item.bpc_valor},
                     inscrito_cadastro_unico  =  ${item.inscrito_cadastro_unico},
                     inscricao_cadastro_unico = '${item.inscricao_cadastro_unico}',
                     habitacao_id             =  ${item.habitacao_id},
                     updatedAt                = now()
               where id = ${item.id};`;
    }
  }).join(``);

  this._connection.query(query, callback);
}

composicaoFamiliarDAO.prototype.list = function(callback) {
  this._connection.query('select * from composicao_familiar where deleted = false',callback);
}

composicaoFamiliarDAO.prototype.delete = function(id, callback) {
  this._connection.query('update composicao_familiar set deleted = true where id = ?', id, callback);
}

composicaoFamiliarDAO.prototype.getByHabitacaoId = function (id,callback) {
  this._connection.query(`select *
                            from composicao_familiar
                           where habitacao_id = ?
                             and deleted = false
                           order by id asc`, [id], callback);
}

module.exports = function(){
    return composicaoFamiliarDAO;
};
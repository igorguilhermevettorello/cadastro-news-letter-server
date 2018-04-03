function permissoesDAO(connection) {
  this._connection = connection;
}

permissoesDAO.prototype.save = function(info, callback) {

  let query = info.map(item => {
    if (item.id === null) {
      return `insert into permissoes (usuario_id, menu_id, ativo, createdAt, updatedAt)
                              values (${item.usuario_id}, ${item.menu_id}, ${item.ativo}, now(), now());`;
    } else {
      return `update permissoes
                 set usuario_id = ${item.usuario_id},
                     menu_id = ${item.menu_id},
                     ativo = ${item.ativo},
                     updatedAt = now()
               where id = ${item.id},`;
    }
  }).join(``);

  this._connection.query(query, callback);
}

permissoesDAO.prototype.getPermissoesByUserId = function(id, callback) {
    this._connection.query('select * from permissoes where usuario_id = ?', [id], callback);
}

permissoesDAO.prototype.getMenusByPermissoesUserId = function(id, callback) {

  if (id === 1) {
    this._connection.query(`select m.id         as id,
                                   m.descricao  as descricao,
                                   m.controller as controller,
                                   m.acao       as acao,
                                   m.menu_id    as menu_id
                              from menus m
                             where m.deleted = 0
                             order by m.id asc`, [id], callback);
  } else {
    this._connection.query(`select m.id         as id,
                                   m.descricao  as descricao,
                                   m.controller as controller,
                                   m.acao       as acao,
                                   m.menu_id    as menu_id
                              from permissoes p
                              left join menus m on (m.id = p.menu_id)
                             where p.usuario_id = ?
                               and m.deleted = 0
                               and p.ativo = 1
                             order by m.id asc`, [id], callback);
  }
}

module.exports = function(){
    return permissoesDAO;
};

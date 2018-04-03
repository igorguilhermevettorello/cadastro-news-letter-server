function menuDAO(connection) {
  this._connection = connection;
}

menuDAO.prototype.save = function(menu, callback) {
  console.log("menu", menu);
  if (menu.id === null) {
    this._connection.query('INSERT INTO menus SET ?', menu, callback);
  } else {
    this._connection.query(`update menus
                               set descricao = ?,
                                   controller = ?,
                                   acao = ?,
                                   menu_id = ?,
                                   updatedAt = ?
                             where id = ?`, [menu.descricao, menu.controller, menu.acao, menu.menu_id, menu.updatedAt, menu.id, ], callback);
  }
}

menuDAO.prototype.list = function(callback) {
    this._connection.query('select * from menus where deleted = 0',callback);
}

menuDAO.prototype.getById = function (id, callback) {
    this._connection.query(`select *
                              from menus
                             where id = ?
                               and deleted = 0`, [id], callback);
}

menuDAO.prototype.getInfoMenu = function (id, callback) {
  this._connection.query(`select *
                            from menus
                           where id = ?
                           union all
                          select *
                            from menus
                           where menu_id = ?
                           order by id asc`, [id, id], callback);
}

menuDAO.prototype.getListPaginate = function (page, limit, callback) {
  this._connection.query(`select mp.id as id,
                                 mp.descricao as descricao,
                                 mp.controller as controller,
                                 mp.acao as acao,
                                 mf.id as menu_id,
                                 mf.descricao as vinculo
                            from menus mp
                            left join menus mf on (mf.id = mp.menu_id)
                           where mp.deleted = 0
                           order by id asc
                           LIMIT ?,?`, [page, limit], callback);
}

menuDAO.prototype.getPaginate = function (limit, callback) {
  this._connection.query(`select ceil(count(*) / ?) as total
                            from menus
                           where deleted = 0`, [limit], callback);
}

menuDAO.prototype.delete = function(id, callback) {
  let query = `update menus
                  set deleted   = true,
                      updatedAt = now()
                where id = ${id};`;

  this._connection.query(query, callback);
}

module.exports = function(){
    return menuDAO;
};
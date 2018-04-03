function usersDAO(connection) {
  this._connection = connection;
}

usersDAO.prototype.save = function(user, callback) {
  let query = '';
  if (user.id === null) {
    query = `insert into users (login, password, createdAt, updatedAt )
                        values ('${user.login}', md5('${user.password}'), now(), now());`
  } else if (typeof user.password === 'undefined') {
    query = `update users
                set login     = '${user.login}',
                    updatedAt = now()
              where id = ${user.id};`;
  } else {
    query = `update users
                set login     = '${user.login}',
                    password  = md5('${user.password}'),
                    updatedAt = now()
              where id = ${user.id};`;
  }
  this._connection.query(query, callback);
}

usersDAO.prototype.update = function(user, callback) {
  let query = '';
  if (typeof user.password === 'undefined') {
    query = `update users
                set login     = '${user.login}',
                    updatedAt = now()
              where id = ${user.id};`;
  } else {
    query = `update users
                set login     = '${user.login}',
                    password  = md5('${user.password}'),
                    updatedAt = now()
              where id = ${user.id};`;
  }
  this._connection.query(query, callback);
}

usersDAO.prototype.delete = function(id, callback) {
  let query = `update users
                  set login     = null,
                      deleted   = true,
                      updatedAt = now()
                where id = ${id};`;

  this._connection.query(query, callback);
}

usersDAO.prototype.list = function(callback) {
  this._connection.query('select * from users where deleted = 0',callback);
}

usersDAO.prototype.getById = function (id,callback) {
  this._connection.query("select * from users where id = ? and deleted = 0",[id],callback);
}

usersDAO.prototype.getByUserPessoaByUserId = function (id,callback) {
  this._connection.query(`select u.id as id,
                                 u.login as login,
                                 p.id as pessoa_id,
                                 p.nome as nome,
                                 p.email as email
                            from users u
                            left join pessoas p on (p.usuario_id = u.id)
                           where u.id = ?`,[id],callback);
}

usersDAO.prototype.verifyLogin = function (user, callback) {
  this._connection.query(`select *
                            from users
                           where login = ?
                             and password = md5('${user.password}') `, [user.login], callback);
}

usersDAO.prototype.verifyUniqueLogin = function (user, opcao, callback) {
  if (opcao) {
    this._connection.query(`select *
                              from users
                             where login =  ?`, [user.login], callback);
  } else {
    this._connection.query(`select *
                              from users
                             where login =  ?
                               and id <> ?`, [user.login, user.id], callback);
  }
}

usersDAO.prototype.getPaginate = function (limit, callback) {
  this._connection.query(`select ceil(count(*) / ?) as total
                            from users
                           where deleted = 0`, [limit], callback);
}

usersDAO.prototype.getListPaginate = function (page, limit, callback) {
  this._connection.query(`select u.id as id,
                                 u.login as login,
                                 p.nome as nome,
                                 p.email as email
                            from users u
                            left join pessoas p on (p.usuario_id = u.id)
                           where u.deleted = 0
                           order by u.id asc
                           limit ?,?`, [page, limit], callback);
}

module.exports = function(){
    return usersDAO;
};
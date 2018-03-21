function usersDAO(connection) {
  this._connection = connection;
}

usersDAO.prototype.save = function(user, callback) {
  this._connection.query('INSERT INTO users SET ?', user, callback);
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

usersDAO.prototype.list = function(callback) {
  this._connection.query('select * from users',callback);
}

usersDAO.prototype.getById = function (id,callback) {
  this._connection.query("select * from users where id = ?",[id],callback);
}

usersDAO.prototype.verifyLogin = function (user, callback) {
  this._connection.query(`select *
                            from users
                           where login = ?
                             and password = md5('${user.password}') `, [user.login], callback);
}

module.exports = function(){
    return usersDAO;
};
function pessoaDAO(connection) {
  this._connection = connection;
}

pessoaDAO.prototype.save = function(pessoa, callback) {
  this._connection.query('INSERT INTO pessoas SET ?', pessoa, callback);
}

pessoaDAO.prototype.update = function(pessoa, callback) {
  let query = '';
  if (typeof pessoa.imagem === 'undefined') {
    query = `${query}
             update pessoas
                set nome      = '${pessoa.nome}',
                    email     = '${pessoa.email}',
                    updatedAt = now()
              where usuario_id = ${pessoa.usuario_id};`;
  } else {
    query = `${query}
             update pessoas
                set nome      = '${pessoa.nome}',
                    email     = '${pessoa.email}',
                    imagem    = '${pessoa.imagem}',
                    updatedAt = now()
              where usuario_id = ${pessoa.usuario_id};`;
  }
  this._connection.query(query, callback);
}

pessoaDAO.prototype.list = function(callback) {
  this._connection.query('select * from pessoas',callback);
}

pessoaDAO.prototype.getById = function (id,callback) {
  this._connection.query("select * from pessoas where id = ?",[id],callback);
}

pessoaDAO.prototype.getByUserId = function (id, callback) {
  this._connection.query("select * from pessoas where usuario_id = ?",[id], callback);
}

module.exports = function(){
    return pessoaDAO;
};
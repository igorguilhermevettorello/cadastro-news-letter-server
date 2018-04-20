function imagensDAO(connection) {
  this._connection = connection;
}

imagensDAO.prototype.save = function(descricao, callback) {

  let query = `insert into imagens ( descricao,
                                     createdAt,
                                     updatedAt )
                            values ( '${descricao}',
                                     now(),
                                     now());`;


  this._connection.query(query, callback);
}

module.exports = function(){
    return imagensDAO;
};
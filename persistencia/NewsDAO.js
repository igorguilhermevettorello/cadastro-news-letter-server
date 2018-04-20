function newsDAO(connection) {
  this._connection = connection;
}

newsDAO.prototype.save = function(news, callback) {

  let query = '';

  if (news.id === '') {
    query = `insert into news ( deleted,
                                descricao,
                                imagem,
                                width,
                                height,
                                createdAt,
                                updatedAt )
                       values ( false,
                                '${news.descricao}',
                                '${news.imagem}',
                                '${news.width}',
                                '${news.height}',
                                now(),
                                now())`;
  } else {
    query = `update news
                set deleted    =  false,
                    descricao  =  '${news.descricao}',
                    imagem     =  '${news.imagem}',
                    width      =  '${news.width}',
                    height     =  '${news.height}',
                    updatedAt  =  now()
              where id = ${news.id}`;
  }

  this._connection.query(query, callback);
}

newsDAO.prototype.list = function(callback) {
    this._connection.query('select * from news where deleted = 0',callback);
}

newsDAO.prototype.getById = function (id, callback) {
    this._connection.query(`select *
                              from news
                             where id = ?
                               and deleted = 0`, [id], callback);
}

newsDAO.prototype.getListPaginate = function (page, limit, callback) {
  this._connection.query(`select *
                            from news
                           where deleted = 0
                           order by id asc
                           LIMIT ?,?`, [page, limit], callback);
}

newsDAO.prototype.getPaginate = function (limit, callback) {
  this._connection.query(`select ceil(count(*) / ?) as total
                            from news
                           where deleted = 0`, [limit], callback);
}

newsDAO.prototype.delete = function(id, callback) {
  let query = `update news
                  set deleted   = true,
                      updatedAt = now()
                where id = ${id};`;

  this._connection.query(query, callback);
}

module.exports = function(){
    return newsDAO;
};
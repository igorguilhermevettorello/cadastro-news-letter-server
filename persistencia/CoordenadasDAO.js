function coordenadasDAO(connection) {
  this._connection = connection;
}

coordenadasDAO.prototype.save = function(coordenadas, callback) {

  console.log("coordenadas", coordenadas);

  let query = coordenadas.map(coordenada => {
    if (coordenada.id === '') {
      return `insert into coordenadas ( deleted,
                                        coordenada1,
                                        coordenada2,
                                        coordenada3,
                                        coordenada4,
                                        link,
                                        new_id,
                                        createdAt,
                                        updatedAt )
                               values ( false,
                                        '${coordenada.coordenada1}',
                                        '${coordenada.coordenada2}',
                                        '${coordenada.coordenada3}',
                                        '${coordenada.coordenada4}',
                                        '${coordenada.link}',
                                        ${coordenada.new_id},
                                        now(),
                                        now());`;
    } else {
      return `update coordenadas
                 set deleted     = false,
                     coordenada1 = '${coordenada.coordenada1}',
                     coordenada2 = '${coordenada.coordenada2}',
                     coordenada3 = '${coordenada.coordenada3}',
                     coordenada4 = '${coordenada.coordenada4}',
                     link        = '${coordenada.link}',
                     new_id      = ${coordenada.new_id},
                     updatedAt   = now()
               where id = ${coordenada.id};`;
    }
  }).join(``);

  console.log("query", query);

  this._connection.query(query, callback);
}

coordenadasDAO.prototype.getByNewsId = function (id, callback) {
    this._connection.query(`select *
                              from coordenadas
                             where new_id = ?
                               and deleted = 0`, [id], callback);
}

coordenadasDAO.prototype.delete = function(id, callback) {
  let query = `update coordenadas
                  set deleted   = true,
                      updatedAt = now()
                where id = ${id};`;

  this._connection.query(query, callback);
}

module.exports = function(){
    return coordenadasDAO;
};
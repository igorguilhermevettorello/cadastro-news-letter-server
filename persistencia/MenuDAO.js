function menuDAO(connection) {
  this._connection = connection;
}

menuDAO.prototype.save = function(menu, callback) {
    this._connection.query('INSERT INTO menus SET ?', pagamento, callback);
}

menuDAO.prototype.list = function(callback) {
    this._connection.query('select * from menus',callback);
}

menuDAO.prototype.getById = function (id, callback) {
    this._connection.query("select * from menus where id = ?", [id], callback);
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


module.exports = function(){
    return menuDAO;
};
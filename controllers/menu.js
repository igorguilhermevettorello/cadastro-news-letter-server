module.exports = function(app){

  app.get('/menus/menu/:id', function(req, res){
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);
    menuDAO.getInfoMenu(id, (error, result) => {
      if (error) {
        let msg = {msg: "Registro não encontrado."}
        res.status(404).json(msg);
      } else {
        let menu = {};
        if (result.length > 1) {
          menu = result[0];
          menu.sub = result
            .filter((item, index) => index > 0)
            .map((item) => item);
        }
        res.status(201).json(menu);
      }
    });
  });

  app.post('/menus/menu', function(req, res){
    var menu = req.body;
    console.log('menu', menu);
    res.send('OK.');
  });
}
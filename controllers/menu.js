module.exports = function(app){

  app.get('/menus/menu/:id', (req, res) => {
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);
    menuDAO.getInfoMenu(id, (error, result) => {
      if (error) {
        let msg = {msg: "Registro não encontrado."};
        connection.end();
        res.status(404).json(msg);
      } else {
        let menu = {};
        if (result.length > 1) {
          menu = result[0];
          menu.sub = result
            .filter((item, index) => index > 0)
            .map((item) => item);
        }
        connection.end();
        res.status(201).json(menu);
      }
    });
  });

  app.get('/menus/all/', (req, res) => {
    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);
    menuDAO.list((error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        connection.end();
        res.status(200).json(result);
      }
    });
  });

  app.get('/menus/lista/:page', (req, res) => {

    let limit = 10;
    let pagina = (isNaN(parseInt(req.params.page))) ? 1 : parseInt(req.params.page);
    pagina = (pagina == 0) ? 1 : pagina;
    //let page = (pagina - 1) * limit;

    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);

    menuDAO.getPaginate(limit, (error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        if (result.length == 0) {
          let msg = {msg: "Registro não encontrado."};
          connection.end();
          res.status(404).json(error);
        } else if (result.length > 1) {
          let msg = {msg: "Erro Interno. Nossa equipe irá verificar essa inconsistência."};
          connection.end();
          res.status(500).json(error);
        } else {

          let total = parseInt(result[0].total);
          if (pagina > total) {
            pagina = total;
          }

          let paginacao = [];
          let next = (pagina == total) ? total : pagina+1;
          let prev = (pagina == 1) ? pagina : pagina-1;

          paginacao.push({
            descricao: '<<',
            pagina: 1
          });

          paginacao.push({
            descricao: '<',
            pagina: prev
          });

          for(let i = 1; i <= total; i++) {
            paginacao.push({
              descricao: i,
              pagina: i
            });
          }

          paginacao.push({
            descricao: '>',
            pagina: next
          });

          paginacao.push({
            descricao: '>>',
            pagina: total
          });

          let page = (pagina - 1) * limit;
          menuDAO.getListPaginate(page, limit, (error, result) => {
            if (error) {
              connection.end();
              res.status(404).json(error);
            } else {
              if (result.length == 0) {
                let msg = {msg: "Registro não encontrado."};
                connection.end();
                res.status(404).json(msg);
              } else {
                let listagem = {
                  paginacao: paginacao,
                  lista: result
                }
                connection.end();
                res.status(200).json(listagem);
              }
            }
          });
        }
      }
    });

  });

  app.get('/menus/lista/', (req, res) => {

    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);
    menuDAO.list((error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        if (result.length == 0) {
          let msg = {msg: "Registro não encontrado."};
          connection.end();
          res.status(404).json(error);
        } else {
          connection.end();
          res.status(200).json(result);
        }
      }
    });

  });

  app.get('/menus/menus/:id', (req, res) => {
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);
    menuDAO.getById(id, (error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        if (result.length == 0) {
          let msg = {msg: "Registro não encontrado."};
          connection.end();
          res.status(404).json(msg);
        } else if (result.length > 1) {
          let msg = {msg: "Erro Interno. Nossa equipe irá verificar essa inconsistência."};
          connection.end();
          res.status(500).json(error);
        } else {
          connection.end();
          res.status(201).json(result[0]);
        }
      }
    });
  });

  app.post('/menus/menus', function(req, res){
    var menu = req.body;
    menu.createdAt = new Date();
    menu.updatedAt = new Date();
    menu.descricao = (menu.descricao !== null) ? menu.descricao : '';
    menu.controller = (menu.controller !== null) ? menu.controller : '';
    menu.acao = (menu.acao !== null) ? menu.acao : '';
    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);
    menuDAO.save(menu, (error, result) => {
      if (error) {
        console.log("error", error);
        connection.end();
        res.status(400).json(error);
      } else {
        menu.id = result.insertId;
        connection.end();
        res.status(201).json(menu);
      }
    });
  });

  app.get('/menu/user', (req, res) => {
    let connection = app.persistencia.connectionFactory();
    let permissoesDAO = new app.persistencia.PermissoesDAO(connection);
    permissoesDAO.getMenusByPermissoesUserId(req.usuario.id, (error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        connection.end();
        res.status(200).json(result);
      }
    });
  });

  app.delete('/menus/menu/:id', (req, res) => {
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);
    menuDAO.delete(id, (error, result) => {
      if (error) {
        console.log("error", error);
        connection.end();
        res.status(400).json(error);
      } else {
        res.status(203).json();
      }
    });
  });
}
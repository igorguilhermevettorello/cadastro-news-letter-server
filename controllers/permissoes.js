module.exports = function(app){

  app.get('/permissoes/permissoes/:page', (req, res) => {

    let limit = 2;
    let pagina = (isNaN(parseInt(req.params.page))) ? 1 : parseInt(req.params.page);
    pagina = (pagina == 0) ? 1 : pagina;

    let connection = app.persistencia.connectionFactory();
    let usersDAO = new app.persistencia.UsersDAO(connection);
    usersDAO.getPaginate(limit, (error, result) => {
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
          usersDAO.getListPaginate(page, limit, (error, result) => {
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
                };
                connection.end();
                res.status(200).json(listagem);
              }
            }
          });
        }
      }
    });
  });

  app.get('/permissoes/permissao/:id', (req, res) => {
    let id = req.params.id;
    //this.permissoesPermissao(id);
    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);
    menuDAO.list((menuError, menuResult) => {
      if (menuError) {
        console.log("error", menuError);
        connection.end();
        res.status(404).json(menuError);
      } else {
        let permissoesDAO = new app.persistencia.PermissoesDAO(connection);
        permissoesDAO.getPermissoesByUserId(id, (permissaoError, permissaoResult) => {
          if (permissaoError) {
            console.log("permissaoError", permissaoError);
            connection.end();
            res.status(404).json(permissaoError);
          } else {

            let permissoes = menuResult.map((rowMenu) => {
              if (permissaoResult.length == 0) {
                rowMenu.permissao_id = null;
                rowMenu.ativo = false;
              } else {
                permissaoResult.map((rowPermissao) => {
                  if (rowPermissao.menu_id == rowMenu.id) {
                    rowMenu.permissao_id = rowPermissao.id;
                    rowMenu.ativo = rowPermissao.ativo;
                  }
                });
              }
              return rowMenu;
            });
            connection.end();
            res.status(200).json(permissoes);
          }
        });
      }
    });
  });

  app.get('/permissoes/permissao/', (req, res) => {
    let id = 0;
    //this.permissoesPermissao(0);
    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);
    menuDAO.list((menuError, menuResult) => {
      if (menuError) {
        console.log("error", menuError);
        connection.end();
        res.status(404).json(menuError);
      } else {
        let permissoesDAO = new app.persistencia.PermissoesDAO(connection);
        permissoesDAO.getPermissoesByUserId(id, (permissaoError, permissaoResult) => {
          if (permissaoError) {
            console.log("permissaoError", permissaoError);
            connection.end();
            res.status(404).json(permissaoError);
          } else {

            let permissoes = menuResult.map((rowMenu) => {
              if (permissaoResult.length == 0) {
                rowMenu.permissao_id = null;
                rowMenu.ativo = false;
              } else {
                permissaoResult.map((rowPermissao) => {
                  if (rowPermissao.menu_id == rowMenu.id) {
                    rowMenu.permissao_id = rowPermissao.id;
                    rowMenu.ativo = rowPermissao.ativo;
                  }
                });
              }
              return rowMenu;
            });
            connection.end();
            res.status(200).json(permissoes);
          }
        });
      }
    });
  });

  app.post('/permissoes/permissao', function(req, res){
    var dados = req.body;

    let info = dados.menu.map(item => {
      return {
        id:item.permissao_id,
        usuario_id: parseInt(dados.usuario.id),
        menu_id: item.id,
        ativo: item.ativo,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    let connection = app.persistencia.connectionFactory();
    let permissoesDAO = new app.persistencia.PermissoesDAO(connection);

    permissoesDAO.save(info, (error, result) => {
      if (error) {
        console.log("error", error);
        connection.end();
        res.status(404).json(error);
      } else {
        console.log("result", result);
        connection.end();
        res.status(200).json(info);
      }
    });
  });

  app.put('/permissoes/permissao/:id', (req, res) => {
    let id = req.params.id;
    let dados = req.body;

    let connection = app.persistencia.connectionFactory();
    let usersDAO = new app.persistencia.UsersDAO(connection);
    usersDAO.verifyUniqueLogin(dados.usuario, false, (error, result) => {
      if (error) {
        console.log("error", error);
        connection.end();
        res.status(400).json(error);
      } else {
        if (result.length > 0 ) {
          let msg = {msg: "Login escolhido já existe no sistema."};
          connection.end();
          res.status(400).json(msg);
        } else {
          usersDAO.update(dados.usuario, (error, result) => {
            if (error) {
              console.log("error", error);
              connection.end();
              res.status(400).json(error);
            } else {

              if (dados.pessoa.id === null) {

                dados.pessoa.updatedAt = new Date();
                dados.pessoa.createdAt = new Date();
                dados.pessoa.usuario_id = dados.usuario.id;

                let pessoaDAO = new app.persistencia.PessoaDAO(connection);
                pessoaDAO.save(dados.pessoa, (error, result) => {
                  if (error) {
                    console.log("error", error);
                    connection.end();
                    res.status(400).json(error);
                  } else {
                    dados.pessoa.id = result.insertId;
                    connection.end();
                    res.status(201).json(dados);
                  }
                });

              } else {

                dados.pessoa.updatedAt = new Date();
                dados.pessoa.usuario_id = dados.usuario.id;
                let pessoaDAO = new app.persistencia.PessoaDAO(connection);
                pessoaDAO.update(dados.pessoa, (error, result) => {
                  if (error) {
                    console.log("error", error);
                    connection.end();
                    res.status(400).json(error);
                  } else {
                    connection.end();
                    res.status(201).json(dados);
                  }
                });
              }
            }
          });
        }
      }
    });
  });
}
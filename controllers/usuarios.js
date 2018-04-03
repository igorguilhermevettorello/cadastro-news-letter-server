module.exports = function(app){

  app.get('/usuarios/select/', (req, res) => {
    let connection = app.persistencia.connectionFactory();
    let usersDAO = new app.persistencia.UsersDAO(connection);
    usersDAO.list((error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        connection.end();
        res.status(200).json(result);
      }
    });
  });

  app.get('/usuarios/select/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let connection = app.persistencia.connectionFactory();
    let usersDAO = new app.persistencia.UsersDAO(connection);
    usersDAO.getById(id, (error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        connection.end();
        res.status(200).json(result);
      }
    });
  });

  app.get('/usuarios/usuarios/:page', (req, res) => {

    let limit = 10;
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

  app.get('/usuarios/usuario/:id', (req, res) => {
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let usersDAO = new app.persistencia.UsersDAO(connection);
    usersDAO.getByUserPessoaByUserId(id, (error, result) => {
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
          res.status(200).json(result[0]);
        }
      }
    });
  });

  app.post('/usuarios/usuario', function(req, res){
    var dados = req.body;
    let connection = app.persistencia.connectionFactory();
    let usersDAO = new app.persistencia.UsersDAO(connection);
    usersDAO.verifyUniqueLogin(dados.usuario, true, (error, result) => {
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
          usersDAO.save(dados.usuario, (error, result) => {
            if (error) {
              console.log("error", error);
              connection.end();
              res.status(400).json(error);
            } else {
              dados.usuario.id = result.insertId;
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
            }
          });
        }
      }
    });
  });

  app.put('/usuarios/usuario/:id', (req, res) => {
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

  app.delete('/usuarios/usuario/:id', (req, res) => {
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let usersDAO = new app.persistencia.UsersDAO(connection);
    usersDAO.delete(id, (error, result) => {
      if (error) {
        console.log("error", error);
        connection.end();
        res.status(400).json(error);
      } else {
        res.status(203).json();
      }
    });
  })
}
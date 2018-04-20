var fs = require('fs');

module.exports = function(app){

  app.get('/news/list/:page', (req, res) => {

    let limit = 10;
    let pagina = (isNaN(parseInt(req.params.page))) ? 1 : parseInt(req.params.page);
    pagina = (pagina == 0) ? 1 : pagina;

    let connection = app.persistencia.connectionFactory();
    let newsDAO = new app.persistencia.NewsDAO(connection);
    newsDAO.getPaginate(limit, (error, result) => {
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
          newsDAO.getListPaginate(page, limit, (error, result) => {
            if (error) {
              connection.end();
              res.status(404).json(error);
            } else {
              if (result.length == 0) {
                let msg = {msg: "Registro não encontrado."};
                connection.end();
                res.status(404).json(msg);
              } else {

                result.map(item => {
                  item.visualizar = `${req.protocol}://${req.get('host')}/public/newsletter/visualizar_${item.id}.html`;
                })

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

  app.get('/news/news/:id', (req, res) => {
    let id = req.params.id;
    let dados = {};
    let connection = app.persistencia.connectionFactory();
    let newsDAO = new app.persistencia.NewsDAO(connection);
    newsDAO.getById(id, (error, result) => {
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
          dados.news = result[0];
          let coordenadasDAO = new app.persistencia.CoordenadasDAO(connection);
          coordenadasDAO.getByNewsId(id, (error, result) => {
            if (error) {
              connection.end();
              res.status(404).json(error);
            } else {
              dados.coordenadas = result;
              console.log("dados", dados);
              connection.end();
              res.status(200).json(dados);
            }
          });
        }
      }
    });
  });

  app.post('/news/news', function(req, res){
    var dados = req.body;
    let connection = app.persistencia.connectionFactory();
    let newsDAO = new app.persistencia.NewsDAO(connection);
    newsDAO.save(dados.news, (error, result) => {
      if (error) {
        console.log("error", error);
        connection.end();
        res.status(400).json(error);
      } else {
        dados.news.id = result.insertId;
        dados.coordenadas.map(item => {
          item.new_id = dados.news.id;
        });
        let coordenadasDAO = new app.persistencia.CoordenadasDAO(connection);
        coordenadasDAO.save(dados.coordenadas, (error, result) => {
          if (error) {
            console.log("error", error);
            connection.end();
            res.status(400).json(error);
          } else {

            fs.appendFile(`public/newsletter/visualizar_${dados.news.id}.html`, dados.news.descricao, function (err) {
              if (err) throw err;
              console.log('Saved!');
            });

            let __html = `${req.protocol}://${req.get('host')}/public/newsletter/visualizar_${dados.news.id}.html`;
            console.log("__html", __html);

            connection.end();
            res.status(201).json(dados);
          }
        });
      }
    });
  });

  app.put('/news/news/:id', (req, res) => {
    let dados = req.body;
    dados.news.id = req.params.id;

    let connection = app.persistencia.connectionFactory();
    let newsDAO = new app.persistencia.NewsDAO(connection);
    newsDAO.save(dados.news, (error, result) => {
      if (error) {
        console.log("error", error);
        connection.end();
        res.status(400).json(error);
      } else {
        dados.coordenadas.map(item => {
          item.new_id = dados.news.id;
        });
        let coordenadasDAO = new app.persistencia.CoordenadasDAO(connection);
        coordenadasDAO.save(dados.coordenadas, (error, result) => {
          if (error) {
            console.log("error", error);
            connection.end();
            res.status(400).json(error);
          } else {
            coordenadasDAO.getByNewsId(dados.news.id, (error, result) => {
              if (error) {
                connection.end();
                res.status(404).json(error);
              } else {
                dados.coordenadas = result;

                fs.appendFile(`public/newsletter/visualizar_${dados.news.id}.html`, dados.news.descricao, function (err) {
                  if (err) throw err;
                  console.log('Saved!');
                });

                connection.end();
                res.status(200).json(dados);
              }
            });
          }
        });
      }
    });
  });

  app.delete('/news/news/:id', (req, res) => {
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let newsDAO = new app.persistencia.NewsDAO(connection);
    newsDAO.delete(id, (error, result) => {
      if (error) {
        console.log("error", error);
        connection.end();
        res.status(400).json(error);
      } else {
        res.status(203).json();
      }
    });
  });

  app.delete('/news/coordenadas/:id', (req, res) => {
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let coordenadasDAO = new app.persistencia.CoordenadasDAO(connection);
    coordenadasDAO.delete(id, (error, result) => {
      if (error) {
        console.log("error", error);
        connection.end();
        res.status(400).json(error);
      } else {
        connection.end();
        res.status(203).json();
      }
    });
  });
}
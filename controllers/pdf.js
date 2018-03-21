var fs = require('fs');
var pdf = require('html-pdf');
//var html = fs.readFileSync('./test/businesscard.html', 'utf8');
var options = { format: 'Letter' };



module.exports = function(app){

  app.get('/pdf/gerar/', function(req, res){

    let imagem = `${req.protocol}://${req.get('host')}/uploads/2018-03-20T01:41:48.864Zavatar.jpg`;
    console.log("imagem", imagem);

    let html = `<!DOCTYPE html>
                <html>
                <head>
                  <title>teste</title>
                </head>
                <body>
                  <p>hello world!!</p>
                  <img src="${imagem}">
                </body>
                </html>`;

    pdf.create(html, options).toFile('./public/pdf/businesscard3.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });

    console.log("dentro");
    res.status(201);
    //let id = req.params.id;
    //let connection = app.persistencia.connectionFactory();
    //let menuDAO = new app.persistencia.MenuDAO(connection);
    //menuDAO.getInfoMenu(id, (error, result) => {
    //  if (error) {
    //    let msg = {msg: "Registro não encontrado."}
    //    res.status(404).json(msg);
    //  } else {
    //    let menu = {};
    //    if (result.length > 1) {
    //      menu = result[0];
    //      menu.sub = result
    //        .filter((item, index) => index > 0)
    //        .map((item) => item);
    //    }
    //    res.status(201).json(menu);
    //  }
    //});
  });

  app.post('/menus/menu', function(req, res){
    var menu = req.body;
    console.log('menu', menu);
    res.send('OK.');
  });
}
//var app = require('./config/express')();
//
//app.listen(3100, () => {
//  console.log("servidor rodando na porta 3100")
//});

var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var db = require('./models');

app.set('io',io);

var porta = process.env.PORT || 3100;
http.listen(porta,function(){
  //db.sequelize.sync();
  console.log("servidor rodando", porta);
});
var jwt  = require('jsonwebtoken');

module.exports = function(app){

  app.post('/authentication', function(req, res){
    let user = req.body;
    var connection = app.persistencia.connectionFactory();
    var usersDAO = new app.persistencia.UsersDAO(connection);

    usersDAO.verifyLogin(user, (error, result) => {
      if (error) {
        connection.end();
        res.status(401).json({msg: "Usuário não encotrado."});
      } else {
        if (result.length == 1) {

          let id = null;
          result.map(item=>id = item.id);

          var token = jwt.sign( {login: user.login, id: id}, app.get('secret'), {
            expiresIn: 86400 // valor em segundo, aqui temos um total de 24 horas
          });

          user.auth_token = token;
          connection.end();
          res.status(200).json(user);

        } else {
          connection.end();
          res.status(401).json({msg: "Usuário não encotrado."});
        }
      }
    });
  });

  app.use('/*', function(req, res, next){
    var token = req.headers['x-access-token']; // busca o token no header da requisição
    if (token) {
      console.log('Token recebido, decodificando');
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          console.log('Token rejeitado');
          return res.sendStatus(401);
        } else {
          console.log('Token aceito')
          // guardou o valor decodificado do token na requisição. No caso, o login do usuário.
          req.usuario = decoded;
          next();
        }
      });
    } else {
      //if (req.pathname === '/uploads/') return next();
      console.log('Nenhum token enviado');
      res.status(401).json({msg: "Nenhum token enviado."});
    }
  });
}
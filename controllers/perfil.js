var file = require('file-system');
var fs = require('fs');

let multer  = require('multer');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

let fileFilter = (req, file, cb) => {
  console.log("fileFilter");
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports = function(app){
  app.get('/perfil/perfil/:id', function(req, res){

    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let menuDAO = new app.persistencia.MenuDAO(connection);
    menuDAO.getInfoMenu(id, (error, result) => {
      let menu = {};
      if (result.length > 1) {
        menu = result[0];

        menu.sub = result
          .filter((item, index) => index > 0)
          .map((item) => item);

      }
      res.status(201).json(menu);
    })
  });

  app.get('/perfil/perfil/', function(req, res){
    let id = req.usuario.id;

    let connection = app.persistencia.connectionFactory();
    let usersDAO = new app.persistencia.UsersDAO(connection);
    usersDAO.getById(id, (error, result) => {

      if (error) {

        console.log("error", error);
        let msg = {msg: "Falha ao salva registro. Tente novamente."}
        res.status(404).json(msg);

      } else {

        let user = {
          id: result[0].id,
          login: result[0].login
        };

        let pessoaDAO = new app.persistencia.PessoaDAO(connection);
        pessoaDAO.getByUserId(user.id, (error, result) => {

          if (error) {

            console.log("error", error);
            let msg = {msg: "Falha ao salva registro. Tente novamente."}
            res.status(404).json(msg);

          } else {

            let imagem = `${req.protocol}://${req.get('host')}/${result[0].imagem}`;
            //console.log("protocol", req.protocol);
            //console.log("host", req.get('host'));
            //console.log("pathname", req.originalUrl);
            //console.log("_imagem", _imagem);

            user.pessoa = {
              id: result[0].id,
              nome: result[0].nome,
              email: result[0].email,
              imagem: imagem,
              createdAt: result[0].createdAt,
              updatedAt: result[0].updatedAt
            };

            res.status(201).json(user);
          }
        });

      }
    })
  });

  app.post('/perfil/perfil', upload.single('files'), (req, res, next) => {

    let user = {
      id: req.usuario.id,
      login: req.body.login
    };

    if (req.body.password) user.password = req.body.password;

    let pessoa = {
      nome: req.body.nome,
      email: req.body.email,
      usuario_id: user.id
    };

    if (typeof req.file !== 'undefined') pessoa.imagem = req.file.path;

    let connection = app.persistencia.connectionFactory();
    let usersDAO = new app.persistencia.UsersDAO(connection);
    usersDAO.update(user, (error, result) => {
      if (error) {
        console.log("error", error);
        let msg = {msg: "Falha ao salva registro. Tente novamente."}
        res.status(404).json(msg);
      } else {
        console.log("result", result);
        let pessoaDAO = new app.persistencia.PessoaDAO(connection);
        pessoaDAO.update(pessoa, (error, result) => {
          if (error) {
            console.log("error", error);
            let msg = {msg: "Falha ao salva registro. Tente novamente."}
            res.status(404).json(msg);
          } else {
            let msg = {msg: "Registro salvo com sucesso."}
            res.status(200).json(msg);
          }
        });
      }
    });
  });
}
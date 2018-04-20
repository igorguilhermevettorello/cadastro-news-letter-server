var file = require('file-system');
var fs = require('fs');

let multer  = require('multer');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/imagem');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

let fileFilter = (req, file, cb) => {
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
  app.post('/imagens/imagens', upload.single('files'), (req, res, next) => {
    if (typeof req.file !== 'undefined') {
      let imagem = `${req.protocol}://${req.get('host')}/${req.file.path}`;
      res.status(200).json({imagem:imagem});
    } else {
      res.status(400).json({msg: "Falha ao salva registro. Verifique a extensão do arquivo (PNG ou JPG). Tente novamente."});
    }
  });
}
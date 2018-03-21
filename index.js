var app = require('./config/express')();

app.listen(3100, () => {
  console.log("servidor rodando na porta 3100")
});
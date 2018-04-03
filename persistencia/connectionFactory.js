var mysql  = require('mysql');

function createDBConnection() {

  if (!process.env.NODE_ENV ||
        process.env.node === 'dev' ||
        process.env.node === 'development') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysqlroot',
      database: 'api_sistema_habitacao',
      multipleStatements: true
    });
  }

  //implementar if if(process.env.NODE_ENV == 'production') {

  if(process.env.NODE_ENV == 'test') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysqlroot',
      database: 'api_sistema_habitacao_teste',
      multipleStatements: true
    });
  }

  if (process.env.NODE_ENV == 'production') {
    return mysql.createConnection({
      host: 'us-cdbr-iron-east-05.cleardb.net',
      user: 'bae2ec6913efd3',
      password: 'af9ecabd',
      database: 'heroku_29c6f15d3273e1e',
      multipleStatements: true
    });
  }
}

module.exports = function() {
    return createDBConnection;
}

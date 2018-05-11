var mysql  = require('mysql');

function createDBConnection() {

  if (!process.env.NODE_ENV ||
        process.env.node === 'dev' ||
        process.env.node === 'development') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysqlroot',
      database: 'api_sistema_newsletter',
      multipleStatements: true
    });
  }

  //implementar if if(process.env.NODE_ENV == 'production') {

  if(process.env.NODE_ENV == 'test') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysqlroot',
      database: 'api_sistema_newsletter_teste',
      multipleStatements: true
    });
  }

  if (process.env.NODE_ENV == 'production') {
    return mysql.createConnection({
      host: 'us-cdbr-iron-east-04.cleardb.net',
      username: 'b2089572977023',
      password: '86b5b957',
      database: 'heroku_9d9214ebdf4b7de',
      multipleStatements: true
    });
  }
}

module.exports = function() {
    return createDBConnection;
}
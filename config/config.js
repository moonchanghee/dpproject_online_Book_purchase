const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2852',
  database: 'mydb1',
  dateStrings: 'date',
  multipleStatements: true,
});

module.exports = pool;

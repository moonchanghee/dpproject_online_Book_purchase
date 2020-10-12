const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2852',
  database: 'dbrpoject',
});

module.exports = pool;

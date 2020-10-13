var express = require('express');
var pool = require('../../config/config');
var router = express.Router();

router.get('/book', function (req, res, next) {
  var sql = 'SELECT * FROM mydb.book';
  pool.getConnection(function (err, conn) {
    conn.query(sql, function (err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
        res.json({ data: '메인', row: row });
      }
    });
  });
});

module.exports = router;

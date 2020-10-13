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
        res.json({ data: '메인', row });
      }
    });
  });
});

router.post('/detail', function (req, res, next) {
  var req_book_no = req.body.BookNo;
  console.log(req_book_no);
  var sql = 'SELECT * FROM mydb.book WHERE mydb.book.book_no = ?';
  pool.getConnection(function (err, conn) {
    conn.query(sql, req_book_no, function (err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
        res.json({ success: true, row });
      }
    });
  });
});

module.exports = router;

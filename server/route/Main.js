var express = require('express');
var pool = require('../../config/config');
var router = express.Router();

router.get('/book', function (req, res, next) {
  var sql = 'SELECT * FROM mydb1.book';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, function (err, row) {
      if (err) {
        console.log(err);
      } else {
        res.json({ data: '메인', row });
      }
    });
  });
});

router.post('/detail', function (req, res, next) {
  var req_book_no = req.body.BookNo;
  var sql = 'SELECT * FROM mydb1.book WHERE mydb1.book.book_no = ?';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, [req_book_no], function (err, row) {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: true, row });
      }
    });
  });
});

router.post('/', function (req, res, next) {
  console.log('dddd');
  console.log(req.body.data);
  const data = req.body.data;
  var sql = 'SELECT * FROM mydb1.book WHERE book_name LIKE ?';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, ['%' + data + '%'], function (err, row) {
      if (err) {
        console.log(err);
      } else {
        res.json({ row });
      }
    });
  });
});

module.exports = router;

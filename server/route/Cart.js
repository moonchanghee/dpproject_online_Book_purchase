var express = require('express');
var pool = require('../../config/config');
var router = express.Router();

router.post('/', function (req, res, next) {
  let book_book_no = req.body.Data.BookNo;
  let member_member_no = req.session.userId;
  let book_count = req.body.count;

  console.log(req.body.count);
  var sql =
    'INSERT INTO mydb1.basket_detail( book_book_no , member_member_no ,basket_book_count ,basket_created) VALUE(?,?,?,now())';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, [book_book_no, member_member_no, book_count], function (
      err,
      row
    ) {
      if (err) {
        console.log('에러' + err);
        res.json({ success: false });
      } else {
        if (row) {
          res.json({ success: true });
        }
      }
    });
  });
});

router.get('/', function (req, res, next) {
  var sql =
    'SELECT * FROM mydb1.basket_detail , mydb1.book WHERE basket_detail.book_book_no = mydb1.book.book_no';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, function (err, row) {
      if (err) {
        console.log('에러' + err);
      } else {
        res.json({ row });
      }
    });
  });
});

router.delete('/:id', function (req, res, next) {
  console.log(req.params.id);

  let sql = 'DELETE FROM mydb1.basket_detail WHERE book_book_no = ?';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, req.params.id, function (err, row) {
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

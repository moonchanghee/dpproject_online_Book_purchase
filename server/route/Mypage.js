var express = require('express');
var pool = require('../../config/config');
var router = express.Router();

router.get('/address', function (req, res, next) {
  console.log('dd');
  let sql =
    'SELECT * FROM mydb.address WHERE mydb.address.member_member_no = ?';
  pool.getConnection(function (err, conn) {
    conn.query(sql, req.session.userId, function (err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
        res.json({ success: true, row });
      }
    });
  });
});

router.post('/address', function (req, res, next) {
  let address_no = req.body.address_no;
  let address_basic = req.body.address_basic;
  let address_detail = req.body.address_detail;
  let member_id = req.session.userId;
  console.log(req.session);
  console.log('포스트 요청');

  //    let member.id = req.session
  let sql =
    'INSERT INTO address( address_no , address_basic , address_detail , member_member_no) VALUE(?,?,?,?)';
  pool.getConnection(function (err, conn) {
    conn.query(
      sql,
      [address_no, address_basic, address_detail, member_id],
      function (err, row) {
        if (err) {
          res.json({ success: false });
          console.log('에러' + err);
        } else {
          if (row) {
            console.log(row);
            res.json({ success: true, row });
          }
        }
      }
    );
  });
});

module.exports = router;

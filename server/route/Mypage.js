var express = require('express');
var pool = require('../../config/config');
var router = express.Router();

router.get('/address', function (req, res, next) {
  console.log('dd');
  let sql =
    'SELECT * FROM mydb1.address WHERE mydb1.address.member_member_no = ?';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, req.session.userId, function (err, row) {
      if (err) {
        console.log(err);
      } else {
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
  let sql =
    'INSERT INTO address( address_no , address_basic , address_detail , member_member_no) VALUE(?,?,?,?)';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(
      sql,
      [address_no, address_basic, address_detail, member_id],
      function (err, row) {
        if (err) {
          res.json({ success: false });
          console.log('에러' + err);
        } else {
          if (row) {
            // console.log(row);
            res.json({ success: true, row });
          }
        }
      }
    );
  });
});

router.post('/card', function (req, res, next) {
  let card_no = req.body.card_no;
  let card_name = req.body.card_name;
  let card_validity = req.body.card_validity;
  let member_id = req.session.userId;
  console.log(req.session);
  console.log('포스트 요청');

  //    let member.id = req.session
  let sql =
    'INSERT INTO card( card_no , card_name , card_validity , member_no) VALUE(?,?,?,?)';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, [card_no, card_name, card_validity, member_id], function (
      err,
      row
    ) {
      if (err) {
        res.json({ success: false });
        console.log('에러' + err);
      } else {
        if (row) {
          // console.log(row);
          res.json({ success: true, row });
        }
      }
    });
  });
});

router.get('/card', function (req, res, next) {
  // console.log('dd');
  let sql = 'SELECT * FROM mydb1.card WHERE mydb1.card.member_no = ?';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, req.session.userId, function (err, row) {
      if (err) {
        console.log(err);
      } else {
        // console.log(row);
        res.json({ success: true, row });
      }
    });
  });
});

router.delete('/card/:id', function (req, res, next) {
  console.log(req.params.id);

  let sql = 'DELETE FROM mydb1.card WHERE card_no = ?';
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

router.delete('/address/:id', function (req, res, next) {
  console.log(req.params.id);

  let sql = 'DELETE FROM mydb1.address WHERE address_no = ?';
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

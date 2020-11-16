var express = require('express');
var pool = require('../../config/config');
var router = express.Router();

router.get('/', function (req, res, next) {
  var sql = 'SELECT * FROM mydb1.order_detail WHERE ';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, function (err, row) {
      if (err) {
        console.log('에러');
      } else {
        res.json({ row });
      }
    });
  });
});

router.get('/card', function (req, res, next) {
  var member_no = req.session.userId;
  var sql =
    'SELECT * FROM mydb1.card , mydb1.member WHERE card.member_no = member.member_no AND member.member_no = ? ';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, [member_no], function (err, row) {
      if (err) {
        console.log('에러' + err);
      } else {
        // console.log(row);
        res.json({ row });
      }
    });
  });
});

router.get('/address', function (req, res, next) {
  var member_no = req.session.userId;
  var sql =
    'SELECT * FROM mydb1.address , mydb1.member WHERE mydb1.address.member_member_no = member.member_no AND member.member_no = ? ';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, [member_no], function (err, row) {
      if (err) {
        console.log('에러' + err);
      } else {
        // console.log(row);
        res.json({ row });
      }
    });
  });
});

router.post('/order', function (req, res, next) {
  console.log('오더');
  console.log(req.body);

  // console.log('ddddddddddddddddddddd' + req.body.SelectCard.card_validity);
  const order_price = req.body[3].order_price;
  const card_number = req.body[1].card_no;
  const card_type = req.body[1].card_name;
  const card_validity = req.body[1].card_validity;
  const address_no = req.body[2].address_no;
  const address_basic = req.body[2].address_basic;
  const address_detail = req.body[2].address_detail;
  // const order_id = order_price + card_number + card_validity + address_no;
  const member_member_no = req.session.userId;
  var sql =
    'INSERT INTO mydb1.order( order_price ,card_type , card_number  ,card_validity ,address_no ,address_basic , address_detail,member_member_no, order_date) VALUES(?,?,?,?,?,?,?,?,now())';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(
      sql,
      [
        order_price,
        card_type,
        card_number,
        card_validity,
        address_no,
        address_basic,
        address_detail,
        member_member_no,
      ],
      function (err, row) {
        if (err) {
          res.json({ success: false });
          console.log('에러' + err);
        } else {
          if (row) {
            // console.log(row.insertId);
            res.json({ success: true, orderid: row.insertId });
          }
        }
      }
    );
  });
});

router.post('/orderdetail', function (req, res, next) {
  console.log('디테일');
  console.log(req.body);
  console.log(req.body[0]);
  console.log(req.body[1]);
  console.log(req.body[2].BookNo);
  const order_order_id = req.body[0];
  const order_detail_count = req.body[1];
  const book_book_no = req.body[2].BookNo;

  var sql =
    'INSERT INTO mydb1.order_detail( book_book_no , order_detail_count ,order_order_id) VALUE(?,?,?)';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(
      sql,
      [book_book_no, order_detail_count, order_order_id],
      function (err, row) {
        if (err) {
          res.json({ success: false });
          console.log('에러' + err);
        } else {
          if (row) {
            res.json({ success: true });
          }
        }
      }
    );
  });
});

router.get('/success/:id', function (req, res, next) {
  console.log(req.params.id);

  const order_id = req.params.id;
  var sql = 'SELECT * FROM mydb1.order WHERE order_id= ?';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, [order_id], function (err, row) {
      if (err) {
        res.json({ success: false });
      } else {
        if (row) {
          res.json({ success: true, row });
        }
      }
    });
  });
});

///////////////////////////

router.get('/coupon', function (req, res, next) {
  var member_no = req.session.userId;
  var sql =
    'SELECT * FROM mydb1.coupon , mydb1.member WHERE mydb1.address.member_member_no = member.member_no AND member.member_no = ? ';
  pool.getConnection(function (err, conn) {
    conn.release();
    conn.query(sql, [member_no], function (err, row) {
      if (err) {
        console.log('에러' + err);
      } else {
        // console.log(row);
        res.json({ row });
      }
    });
  });
});

module.exports = router;

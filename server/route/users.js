var express = require('express');
var pool = require('../../config/config');
var router = express.Router();

var sess

router.get('/login', function (req, res, next) {
   sess=req.session;
  console.log(sess)
  if(sess.userName != null){
  res.json({sess : sess.userName , success : true})
}
  else{
    res.json({ success : false})
  }
  
});


router.post('/login', function (req, res, next) {
   sess=req.session;
var  user_id = req.body.id;
var  password =   req.body.password;
console.log(req.body)
var sql = 'SELECT *FROM dbrpoject.member WHERE dbrpoject.member.member_id = ? AND dbrpoject.member.member_pwd = ?';
pool.getConnection(function(err, conn){
  conn.query(sql,[ user_id , password] , function (err, row) {
    if (err) {
      console.log('err :' + err);
    } else {
      if (row.length === 0) {
        res.send("<script> alert('존재하지않는 아이디입니다.');history.back();</script>")
      } else {
        
          sess.userId= row[0].member_id;  
          sess.userPwd = row[0].member_pwd;
          sess.userEmail = row[0].member_email;
          sess.userName = row[0].member_name;
          console.log("네임 = " + sess.userEmail  )
          res.json({success : true , sess : sess.userName})
          // res.redirect('/')
        
      }
    }
  });
});
});

router.post('/register', (req, res, next) => {
  var body = req.body;
  console.log(req.body);
  var sql =
    'INSERT INTO member( member_id , member_pwd , member_email , member_name) VALUE(?,?,?,?)';
  pool.getConnection(function (err, conn) {
    conn.query(sql, [body.id, body.pwd, body.email , body.name], function (err, row) {
      if (err) {
        res.send(
          "<script>alert('아이디가 중복되었습니다.');history.back();</script>"
        );
        console.log('에러' + err);
      } else {
        if (row) {
          console.log(row);
          // res.redirect('/')
          res.send({ success: true });
        }
      }
    });
  });
});



router.get('/logout', function(req, res, next) {
  sess = req.session;
  sess.destroy();
  if(sess.userName != null){
    res.json({sess : sess.userName , success : true})
  }
    else{
      res.json({ success : false})
    }
  // res.redirect('/')
});



module.exports = router;
var express = require('express');
var pool = require('../../config/config');
var router = express.Router();



router.get('', function (req, res, next) {
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







module.exports = router;
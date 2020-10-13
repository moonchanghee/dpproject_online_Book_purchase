var express = require('express');
var pool = require('../../config/config');
var router = express.Router();

data = [
  {
    key: '1',
    UserId: 'moon',
  },
];

router.post('/', function (req, res, next) {
  let data = req.body.e;
  console.log(data);
  res.json({ data: data });
});

router.get('/', function (req, res, next) {
  res.json({ success: true, data: 'cart data' });
});

module.exports = router;

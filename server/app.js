var express = require('express');
var Users = require('./route/users');
// var pool = require('./config/config')
// var pool = require('../config/config')
var app = express();
var session = require('express-session');
const bodyparser = require("body-parser")
var cors = require('cors')
app.use(bodyparser.json());
const port = 3002;
app.use(cors())

app.use(session({
    // secret: 'fdasj#@U!&#%#$',
    secret: '!@#$%dfasfe%$$',
    resave: false,
    saveUninitialized: true,   // 세션이 필요하기전까진 세션을 실행하지 않겠다
  }));



app.use('/user', Users);
app.use('/cart', Cart);


app.listen(port, () => console.log(`listening on port ${port}!`));
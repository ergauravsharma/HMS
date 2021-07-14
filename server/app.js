var createError = require('http-errors');
var express = require('express');
var path = require('path');
const app = express();
var cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/index');
const log = require('./log');

var indexRouter = require('./routes/index');
var users = require('./routes/users');




app.use(cookieParser());



// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));


app.use('/', indexRouter);
app.use('/users', users);




app.listen(config.server.port, err => {
  if (err) {
    log.err('server', 'could not start listening', err.message || err);
    process.exit();
  }
  log.log('env', `app starting in "${config.env}" mode...`);
  log.log('server', `Express server is listening on ${config.server.port}...`);
});
module.exports = app; 

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var randomstring = require('randomstring');
var { Iamporter, IamporterError } = require('iamporter');

var app = express();

// view engine setup


mongoose.connect('mongodb://localhost:27017/youngb') ;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("Mongo On");
});

var user = mongoose.Schema({
    "id" : String,
    "password" : String,
    "name" : String,
    "token" : String,
    "school" : String,
    "class":String,
    "cardNumber":String,
    "cardPassword":String,
    "cardBirthday":String,
    "cardExpiry":String,
    "status":String,
});

var call = mongoose.Schema({
    "school":String,
    "name":String,
    "class":String,
    "price":String,
    "tip":String,
    "type":String,
    "menu":Object,
    "userToken":String,
    "callToken":String
});

var shuttle = mongoose.Schema({
    "school":String,
    "name":String,
    "class":String,
    "price":String,
    "tip":String,
    "type":String,
    "menu":Object,
    "userToken":String,
    "shuttleToken":String,
    "shuttleName":String,
});

var userModel = mongoose.model('userModel',user);
var callModel = mongoose.model('callModel',call);
var shuttleModel = mongoose.model('shuttleModel',shuttle);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


require('./routes/auth')(app , randomstring , userModel);
require('./routes/payment')(app , Iamporter, IamporterError , userModel);
require('./routes/call')(app , callModel , userModel , randomstring , shuttleModel);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;

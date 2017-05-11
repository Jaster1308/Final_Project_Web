console.log('hello from heroku');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);

var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var session_url = process.env.SESSION_URL;
var url = process.env.MONGO_URL;

console.log(session_url);
console.log(url);

app.use(session({
    secret: 'replace me with long random string',
    resave : true,
    saveUninitialized: true,
    store: new MongoDBStore( {uri: session_url,
    collection: 'flower'})
}));



require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// //still working on this......something is wrong with communicating
// var mongo_pw = process.env.MONGO_PW;
// // var url = 'mongodb://localhost:27017/index';
// // mongoose.connect(url);
// var session_url = 'mongodb://admin:' + mongo_pw + '@localhost:27017/';
// var url = process.env.Mongo_URL;
// MongoClient.connect(url,function(err, db){});
mongoose.connect(url);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
// app.use('/users', users);

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
  res.render('error');
});

module.exports = app;

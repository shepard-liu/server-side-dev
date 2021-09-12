var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

//User Database Collection
const Users = require('./model/users');

//Routers
var dishRouter = require('./routers/dishRouter');
var promoRouter = require('./routers/promoRouter');
var leaderRouter = require('./routers/leaderRouter');
var userRouter = require('./routers/userRouter');
var indexRouter = require('./routers/indexRouter');
const flash = require('connect-flash');

//MongoDB
var mongoose = require('mongoose');

//Connect database server
mongoose.connect(config.mongoURL).then(() => {
  console.log('Connected to Mongo DB');
}).catch((err) => {
  console.log(err);
});

var app = express();
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', userRouter);

app.use(express.static(path.join(__dirname, 'public')));

//use Routers
app.use('/dishes', dishRouter);
app.use('/promos', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
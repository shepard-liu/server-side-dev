var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

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

//MongoDB
var mongoose = require('mongoose');

//Connect database server
mongoose.connect('mongodb://localhost:27017/confusion').then(() => {
  console.log('Connected to Mongo DB');
}).catch((err) => {
  console.log(err);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session set up
app.use(session({
  name: 'session-id',
  secret: '124nua87gtubguf989203',
  saveUninitialized: false,
  resave: false,
  store: new FileStore('./sessions'),
  cookie: {
    maxAge: 100000,
  }
}));

app.use((req, res, next) => { console.log(req.sessionID); next(); });

app.use('/', indexRouter);
app.use('/users', userRouter);

// User Authentication
app.use((req, res, next) => {
  if (!req.session.user) {
    let error = new Error('You are not authenticated.');
    error.status = 403;
    next(error);
  } else {
    // Varify user
    Users.findOne({ username: req.session.user }).then((user) => {
      if (user)
        next();
      else {
        req.session.destroy();
        res.clearCookie();
        let error = new Error('Session user does not exist, clearing session cookie');
        error.status = 401;
        return error;
      }
    }).catch(err => {
      next(err);
    })
  }
})

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
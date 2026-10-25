
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Connect to MongoDB through app_api
require('./app_api/models/db');

// Configure Passport authentication
var passport = require('./app_api/config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var travelRouter = require('./app_server/routes/travel');

// RESTful API routes
var apiRouter = require('./app_api/routes/index');

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);

// Connect REST API endpoints
app.use('/api', apiRouter);

 // Handle API authentication errors
app.use('/api', function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Unauthorized access. A valid login token is required.'
    });
  }

  return res.status(err.status || 500).json({
    message: 'An API error occurred.'
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const createError   = require('http-errors');
const express       = require('express');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');

const router = require('./routes/index');
const app    = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;

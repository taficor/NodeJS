var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
require('./modes/userModel');
require('./modes/categoryModes');
require('./modes/productModel');
require('./modes/sinhvienModel');
require('./modes/SinhVienL3Model');
require('./modes/testModel');
require('./modes/Upload');
require('./modes/Gmail');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter =require('./routes/products');
var sinhviensRouter=require('./routes/sinhviens');
var svRouter=require('./routes/svs');
var testRouter=require('./routes/tests');
var uploadRouter=require('./routes/Uploads');
var gmailRouter=require('./routes/gmails');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://duongthaovi10:HY6BR59oJsj2hUgY@cluster0.oakfa.mongodb.net/ps16887')
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/sinhviens',sinhviensRouter);
app.use('/svs',svRouter);
app.use('/tests',testRouter);
app.use('/uploads',uploadRouter);
app.use('/gmails',gmailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

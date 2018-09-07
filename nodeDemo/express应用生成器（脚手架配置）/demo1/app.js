var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 生成express实例
var app = express();

// view engine setup 设置视图引擎
app.set('views', path.join(__dirname, 'views')); // 配置视图路径 会设置到views
app.set('view engine', 'ejs'); // 也可以使用jade

// 使用包文件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 访问路由时  配置不同的路由对象实例

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); 
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
/*
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'
app.set('views', path.join(__dirname, 'views')); // ** /server/views
*/ 
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {maxAge: 60000}}));

  /*

    由于path默认为“/”，因此对应用程序的每个请求都将执行没有路径安装的中间件。
    例如，对应用程序的每个请求都将执行此中间件功能：

    app.use(function (req, res, next) {
      console.log('Time: %d', Date.now())
      next()
    })

  中间件功能按顺序执行，因此中间件包含的顺序很重要。

  // this middleware will not allow the request to go beyond it

    app.use(function(req, res, next) {
      res.send('Hello World')
    })

  // requests will never reach this route

  app.get('/', function (req, res) {
    res.send('Welcome')
  })

错误处理中间件
错误处理中间件总是需要四个参数。您必须提供四个参数以将其标识为错误处理中间件函数。
即使您不需要使用该next对象，也必须指定它以保持签名。否则，该next对象将被解释为常规中间件，并且将无法处理错误。
有关错误处理中间件的详细信息，请参阅：错误处理。
以与其他中间件函数相同的方式定义错误处理中间件函数，除了四个参数而不是三个，特别是签名(err, req, res, next)）

  app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

*/

app.use(function (req, res, next) { // app.use 进行最拦截
  if (req.cookies.userId) { // 判断客户端的请求中是否携带有cookie 因为登录时会在设置cookie
    next()
  } else {
    if (req.originalUrl == '/users/login' || req.originalUrl == '/users/logout' || req.originalUrl.indexOf('/goods/list') > -1) { 
      // req.originalUrl.indexOf('/goods/list') > -1  查询商品的一级路由作为白名单权限使用
      // 登录 登出的接口在白名单中 也不存在cookie的检测
      next()
    } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      })
    }
  }
})


app.use('/', indexRouter); // app.js 里面定义的是一级路由  // routes下面定义的都是二级路由
app.use('/users', usersRouter);
app.use('/goods', goodsRouter); 
/*
  这里的app.use('/goods', goodsRouter) 是后端接口路由服务即 http://localhost:3000/goods 服务被访问时
  （这里存在跨域问题 虽然是本地开发 但是客户端的端口是8080，服务端是3000 需要在客户端的src/conig/index.js 配置代理）

  返回 var goodsRouter = require('./routes/goods'); 即输出goods.js



*/ 

// catch 404 and forward to error handler  捕获404的错误 并进行输出
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) { // 其它error类型的捕获
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 连接MongoDB  , { useMongoClient: true }
mongoose.connect('mongodb://localhost/db_demo', { useMongoClient: true });


mongoose.connection.on('connected', function () {
  console.log("MongoDB connected success")
})

mongoose.connection.on('error', function () {
  console.log("MongoDB connected fail")
})

mongoose.connection.on('disconnected', function () {
  console.log("MongoDB is disconnected")
})

/*
  这里的get('/') 是指客户端即前端路由地址的访问用的get方法

  var goodsRouter = require('./routes/goods');
  在app.js中 因为配置过app.use('/goods', goodsRouter); 

  前端src项目中配置的默认路由为GoodsList

  export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    }
     
  ]

  而在客户端即前端，进行http服务访问时，输出匹配到的相应的GoodsList组件，

  组件在实例化时，会调用axios服务进行axios.get('/goods').then((res) => {
    
  })的请求

  var goodsRouter = require('./routes/goods');
  在服务端 由于顶层路由中间件实例中，app.use('/goods', goodsRouter)
  即定义好了 客户端对服务端发起 http://localhost:8080/goods（自己本地开发时 需要在前端src/index.js 中配置 proxyTable: {
      '/goods': {
        target: 'http://localhost:3000'
      }
    }） 代理

  而app.use('/goods', goodsRouter) 定义好服务端的服务规则（这里的定义输出规则是为了：将路由分成文件甚至是迷你应用程序。）

  即输出routes目录下的goods.js（） 然后在goods.js 中处理路由

  router.get('/', function (req, res, next) {  
  
  })

  这里的get('/') 是指客户端即前端路由地址的访问用的get方法，
  
  在被分割的成模块的迷你应用goods.js中对 客户端即Axiso.get('/goods') 向 服务端 发起的 http请求访问

  路由的检测是get（'/'），实际即访问http://localhost:8080/goods 

  因为在app.js进行过分发和配置 app.use('/goods', goodsRouter) 即会有一个goods层级配置

  相应的 GoodLists.Vue中 Axiso.get('/goods/123')

  那么 server服务端的routes下的goods.js的get匹配应为 
  router.get('/123', function (req, res, next) {  
    
  })

*/ 

// 查询商品列表数据
router.get('/list', function (req, res, next) {  // ????????????为什么会这样进行配置‘/’  这个/ 到底是什么意思？
  // console.log(req.params)

  // var page = req.params.page // 通过express封装的路由 get方式获取路由参数的方法
  // var pageSize = req.params.pageSize
  // var sort = req.params.sort // 前端路由的参数 用于排序 1 升序 -1 降序

  var page = req.param('page') // 通过express封装的路由 get方式获取路由参数的方法
  var pageSize = req.param('pageSize')
  var sort = req.param('sort') // 前端路由的参数 用于排序 1 升序 -1 降序

  var priceLevel = req.param('priceLevel')
  var priceGt = '', priceLte = ''

  var skip = (page - 1) * pageSize

  let param = {}

  if (priceLevel !== 'all') {
    switch (priceLevel) {
      case '0': priceGt = 0; priceLte = 100; break;
      case '1': priceGt = 100; priceLte = 500; break;
      case '2': priceGt = 500; priceLte = 1000; break;
      case '3': priceGt = 1000; priceLte = 5000; break;
    }
    param = {
      salePrice: {
        $gt: priceGt,  // db.collection.find({"field":{$gt:value}}); mongoDB 语法
        $lte: priceLte
      }
    }
  }
  // let goodsModel = Goods.find(param) // Goods.find() 查询默认会返回一个模型对象
  // console.log(typeof goodsModel) // Object
  // console.log(goodsModel instanceof Object) // trun
  // limit  limit(parseInt(pageSize))  参数一定要是num类型

  // .exec(cb)  执行查询，并将查询结果传入回调函数cb
  Goods.find(param).skip(skip).limit(parseInt(pageSize)).sort({ 'salePrice': sort }).exec({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })

  // Goods.find({}, function(err, doc) {
  //   if (err) {
  //     res.json({
  //       status: '1',
  //       msg: err.message
  //     })
  //   } else {
  //     res.json({
  //       status: '1',
  //       list: doc
  //     })
  //   }
  // })

  // res.json(123)
})

// 加入购物车 /goods/addCart  app.js 配置了 当前服务端访问路由时的输出资源 即 app.use('/goods', goodsRouter); 
// var goodsRouter = require('./routes/goods');
router.post('/addCart',function (req, res, next) {
  var userId = '100000077'
  productId = req.body.productId
  var User = require('../models/user')

  User.findOne({ 'userId': userId }, function (err, userDoc) { 
    if (err) {
      res.json ({
        status: '1',
        msg: err.msg
      })
    } else { // 查询成功 并非err异常  可能数据为空
      console.log('userDoc:' + userDoc)

      if (userDoc) { // 当匹配的userId 用户数据存在时
        let goodsItem = ''
        userDoc.cartList.forEach(function (item) { 
          // forEach循环会改变原数组  不需要return map需要return  item.productNum++
          if ( item.productId === productId ) { // Users中的内嵌文档cartList中已有该商品Id
            item.productNum = parseInt(item.productNum) + 1
            goodsItem = item
          }
        })
        if (goodsItem) { // 即Users中的内嵌文档cartList中已有该商品Id
          userDoc.save(function (err3, doc3) {
            if (err3) {
              res.json({
                status: '1',
                msg: err3.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'success'
              })
            }
          })
        } else {
          Goods.findOne({ 'productId': productId }, function (err, doc) { // 查询Goods中是否存在该商品
            if (err) {
              res.json ({
                status: '1',
                msg: err.msg
              }) 
            } else{
              if (doc) { // 存在该商品 并成功获取到商品的信息
                doc.productNum = 1
                doc.checked = 1
                userDoc.cartList.push(doc) // User查询出来的 userDoc collection  push操作
                console.log(doc)
                userDoc.save(function (err2, doc2) { // 进行save更新
                  if (err2) {
                    res.json ({
                      status: '1',
                      msg: err.msg
                    }) 
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'success'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})

module.exports = router



/*

express.Router 类
有助于组织路由的另一个功能是一个新类，  express.Router可用于创建模块化可安装路由处理程序。一个Router实例是一个完整的中间件和路由系统; 因此，它通常被称为“迷你应用程序”。

以下示例将路由器创建为模块，在其中加载中间件，定义一些路由，并将其安装在主应用程序的路径上。

例如，创建birds.jsapp目录中指定的路由器文件，其中包含以下内容：

var express = require('express')
var router = express.Router()

// middleware specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
然后，在应用程序中加载路由器模块：

var birds = require('./birds')

// ...

app.use('/birds', birds)
该应用程序现在将能够处理请求的/birds和  /birds/about路径，并调用timeLog 中间件是特定的路线。



*/ 
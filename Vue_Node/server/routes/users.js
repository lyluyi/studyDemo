var express = require('express')
var router = express.Router()

require('./../util/util')

var User = require('./../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName, // post 方式获取参数
    userPwd: req.body.userPwd
  }

  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '账号密码不正确'
      })
    } else {
      if (doc) {
        // app.use(cookieParser()) 设置Cookie 服务端 通过响应的res写入服务器的Cookie 然后将res返回给客户端
        res.cookie('userId', doc.userId, {
          path: '/', // cookie放置路径 服务器的根路径（域名 而非子域名）
          maxAge: 1000*60*60
        })
        res.cookie('userName', doc.userName, {
          path: '/', // cookie放置路径 服务器的根路径（域名 而非子域名）
          maxAge: 1000*60*60
        })
        // session 是客户端发起的请求里面 也可以设置服务端的session
        // req.session.user = doc
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })

})

// 登出接口
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })

  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

// 登录校验 当用户每次刷新时 进行客户端是否带有userName 的请求 并在GoodsList的mounted周期中 进行服务请求验证
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

// 查询当前用户购物车信息
router.get('/cartList', function (req, res, next) {
  var userId = req.cookies.userId
  //设置session
  // req.session.aaa = '222'
  // console.log(req.session.aaa + '**********')

  User.findOne({ 'userId': userId }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})

// 购物车删除
router.post('/cartDel', function (req, res, next) {
  var userId = req.cookies.userId, productId = req.body.productId
  User.update({'userId': userId}, {$pull:{'cartList': {'productId': productId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'success'
      })
    }
  })
})

// 购物车商品数量增添
router.post('/cartEdit', function (req, res, next) {
  var userId = req.cookies.userId
  var productId = req.body.productId
  var productNum = req.body.productNum
  var checked = req.body.checked

  User.update({'userId': userId, 'cartList.productId': productId}, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked,
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'success'
      })
    }
  })
})

// 全选
router.post('/editCheckAll', function (req, res, next) {
  var userId = req.cookies.userId
  var checkAll = req.body.checkAll ? '1' : '0'
  User.findOne({'userId': userId }, function (err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (user) {
        console.log(111)
        user.cartList.forEach(item => {
          item.checked = checkAll
        })
        user.save(function (err1, doc) {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message,
              result: ''
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
})

// 查询用户地址
router.get('/addressList', function (req, res, next) {
  var userId = req.cookies.userId
  User.findOne({'userId': userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.addressList
      })
    }
  })
})

// 设置默认地址
router.post('/setDefault', function (req, res, next) {
  var userId = req.cookies.userId
  var addressId = req.body.addressId
  if (!addressId) {
    res.json({
      status: '1003',
      msg: 'addressId is null',
      result: ''
    })
  } else {
    User.findOne({'userId': userId}, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        var addressList = doc.addressList
        addressList.forEach(item => {
          if (item.addressId === addressId) {
            item.isDefault = true
          } else {
            item.isDefault = false
          }
        })
      }
      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: ''
          })
        }
      })
    })
  }
})

// 删除地址接口
router.post('/delAddress', function (req, res, next) {
  var userId = req.cookies.userId
  var addressId = req.body.addressId
  // 这里有两种思路 前者是 find出来 处理子文档数据 然后save  后者简单 直接update 使用$pull 操作子文档
  User.update({
    'userId': userId,
  },{
    $pull: {
      'addressList': { 'addressId': addressId }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  })
})

router.post('/payMent', function (req, res, next) {
  var userId = req.cookies.userId
  var orderTotal = req.body.orderTotal
  var addressId = req.body.addressId
  User.findOne({'userId': userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      var address = '' // 记录用户的订单地址信息
      var goodList = []
      // 获取当前用户的地址信息
      doc.addressList.forEach(item => {
        if (addressId === item.addressId) {
          address = item
        }
      })

      // 获取用户购物车购买的商品
      doc.cartList.filter(item => {
        if (item.checked === '1') {
          goodList.push(item)
        }
      })

      var r1 = Math.floor(Math.random() * 10) // 0-9 随机数
      var r2 = Math.floor(Math.random() * 10)

      var platform = '622' // 模拟一个平台编号
      var sysDate = new Date().Format('yyyyMMddhhmmss') // 保证订单编号的唯一

      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')

      var orderId = platform + r1 + sysDate + r2

      var order = {
        'orderId': orderId,
        'orderTotal': orderTotal,
        'addressInfo': address,
        'goodList': goodList,
        'orderStatus': '1',
        'createDate': createDate
      }

      doc.orderList.push(order)

      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: {
              'orderId': order.orderId,
              'orderTotal': order.orderTotal
            }
          })
        }
      })
    }
  })
})

// 根据订单ID查询订单信息
router.get('/orderDetail', function (req, res, next) {
  var userId = req.cookies.userId
  var orderId = req.param('orderId') // get 方式的参数 用param post 方式 就是req.body.orderId
  User.findOne({'userId': userId }, function (err, userInfo) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      var orderList = userInfo.orderList
      var orderTotal = 0
      if (orderList.length > 0) {
        orderList.forEach(item => {
          if (item.orderId === orderId) {
            orderTotal = item.orderTotal
          }
        })
        if (orderTotal > 0) {
          res.json({
            status: '0',
            msg: '',
            result: {
              'orderId': orderId,
              'orderTotal': orderTotal
            }
          })
        }
      } else {
        res.json({
          status: '120001',
          msg: '无此订单',
          result: ''
        })
      }
    }
  })
})

// 获取当前购物车的数据
router.get('/getCartCount', function (req, res, next) {
  if (req.cookies && req.cookies.userId) {
    var userId = req.cookies.userId
    User.findOne({'userId': userId}, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        var cartList = doc.cartList
        let cartCount = 0
        cartList.map(item => {
          cartCount += parseInt(item.productNum)
        })
        res.json({
          status: '0',
          msg: '',
          result: cartCount
        })
      }
    })
  }
})

module.exports = router

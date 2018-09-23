// 单元测试 白盒测试 黑盒测试  功能测试

// 单元测试 BDD 行为驱动开发  TDD 测试驱动开发

// 一个单元测试：定义一个场景，场景初始化数据。开始调用测试的单元代码执行，
// 然后检查执行的结果是否为预期的结果。如果是，单元测试通过，不是单元测试不通过
// 清理测试现场数据

// 定义一个测试场景, 第一个参数为场景描述。第二个参数：测试场景的回调

const userService = require('../service/userService')

// node 自带的断言库
const assert = require('assert')
// should.js 断言库
const should = require('should')

describe('userService服务测试', function() {
  
  // 初始化场景数据 BDD before: 所有的测试用例执行之前先执行的代码
  before(function () {
    //  一般做数据的初始化
    console.log('before......')
    require('../initData') // 初始化db.json文件的代码
    
  })

  // 所有测试用例执行完成后，执行的方法
  after(function () {
    console.log('after: finished')
  })

  // 定义测试用例
  it('#getUsers()', function () {
    // 这个方法执行后，期待返回一个数组。

    // 33 条数据
    var arr = userService.getUsers()
    // Array.isArray(arr) === true

    // 使用断言库
    assert.equal(true, Array.isArray(arr)) // 预期 Array.isArray(arr) 的值 为 true
    assert.equal(arr.length > 0, true)
  })

  //#region node assert 原生的断言库 模块使用
  // it('#getPageUsers()', function () {
  //   console.log('sss')
  //   // TDD 先写单元测试 再去写功能逻辑
  //   const data = userService.getPageUsers(2, 10)

  //   // 正常参数的测试
  //   assert.equal(data.users.length, 10)
  //   assert.equal(Array.isArray(data.users), true)

  //   // 测试异常的数据 此时的单元测试并没有通过 说明getPageUsers（）的参数没有做好校验
  //   // const eData = userService.getPageUsers('-2', 'a1')
  //   // assert.equal(eData.users.length, 10)
  //   // assert.equal(Array.isArray(eData.users), true)

  //   const eData = userService.getPageUsers('-2', 'a1')
  //   assert.equal(eData.code, 0, '如果传入不符合规则的page，返回code为0') // 此时测试通过
  //   assert.equal(eData, {
  //     code: 0,
  //     msg: 'page参数的类型不符合条件'
  //   }, '传入不符合规则的参数，应该返回对象')
  // }) // 此时测试单元不能通过 因为引用地址不相同 node 自带的 assert断言库 无法比较属性的值是否相等，
  //    // 用should.js 断言库 可以实现属性值相等的断言 即使对象的引用地址不一致
  //#endregion

  it('#getPageUsers() 用should.js', function () {
    const data = userService.getPageUsers('222', 333)
    // {
    //   code: 0,
    //   msg: 'page参数的类型不符合条件'
    // }

    // 第一个分支测试
    data.should.be.a.Object()  // data 应该是一个对象
    data.code.should.eqls(0) // data.code  应该为 0
    data.code.should.above(-1) // data.code 大于-1
    data.should.eqls({
        code: 0,
        msg: 'page参数的类型不符合条件'
    }) // data 应该是这个对象  只会比较属性值是否相等 因此测试用例通过
  })

  // 第二个分支进行测试
  userService.getPageUsers(2, 'dsa').should.eqls({
    code: 0,
    msg: 'size参数的类型不符合条件'
  })

  const edata = userService.getPageUsers(2, 5)
  edata.should.be.a.Object()
  edata.code.should.eqls(1)
  edata.users.length.should.eqls(5)
  edata.should.containEql({
    code: 1,
    msg: '获取成功！'
  }) // 应该包含

})

// istanbul 测试覆盖率 istanbul cover _mocha 报错 windows下 使用 istanbul cover node_modules/mocha/bin/_mocha


import * as types from './mutation-types.js'

/*
定义state数据的修改操作

从图上可以看出mutation-types定义的变量在这里得到了应用
*/
const mutations = {
  // 可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  /*
    function getPoint() {
    const x = 1;
    const y = 10;
    return {x, y};
    }
    getPoint()
    // {x:1, y:10}

  */
  [types.CHANGE_STYLE](state, {color, url}) {
    console.log(color)
    state.iPhone6S.activeStyle = color
    state.iPhone6S.activeStyleUrl = url
  },
  [types.CHANGE_PRICE](state, {type,price,color,url}) {
    state.iPhone6S.activeStorage = type
    state.iPhone6S.price = price
    state.iPhone6S.isSelected = false
  },
  [types.ADD_ITEM](state) {
    const activeStyle = state.iPhone6S.activeStyle === undefined ? '银色' : state.iPhone6S.activeStyle
    const type = activeStyle + '，' +  state.iPhone6S.activeStorage
    const cartInfo = {
      type: type,
      count: 1,
      price: state.iPhone6S.price
    }
    state.cart.push(cartInfo)
  },
  [types.REMOVE_ITEM](state, index) {
    state.cart.splice(index,1)
  }
}

export default  mutations
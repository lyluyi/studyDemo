import * as types from './mutation-types.js'

const mutations = {
  [types.CHANGE_PRICE] (state, {type, price}) {
    switch (type) {
      case '16GB' : state.iPhone6S.price = state.iPhone6S.storage[0].price
        break
      case '64GB' : state.iPhone6S.price = state.iPhone6S.storage[1].price
        break
      case '128GB' : state.iPhone6S.price = state.iPhone6S.storage[2].price
        break
    }
    state.iPhone6S.isSelected = false
    state.iPhone6S.activeStorage = type
  },
  [types.CHANGE_STYLE] (state, {url, color}) {
    state.iPhone6S.activeStyleUrl = url
    state.iPhone6S.activeStyle = color
  },
  [types.ADD_ITEM] (state) {
    const activeStyle = state.iPhone6S.activeStyle === undefined ? '银色' : state.iPhone6S.activeStyle
    const type = activeStyle + '，' + state.iPhone6S.activeStorage
    const cartInfo = {
      type: type,
      count: 1,
      price: state.iPhone6S.price
    }
    state.cart.push(cartInfo)
  },
  [types.REMOVE_ITEM] (state, {index}) {
    state.cart.splice(index, 1)
  }
}

export default mutations

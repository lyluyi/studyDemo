import * as types from './mutation-types.js'

export const changeStyle = function ({commit}, ...arg) {
  commit(types.CHANGE_STYLE, ...arg)
}

export const changePrice = function ({commit}, ...arg) {
  commit(types.CHANGE_PRICE, ...arg)
}

export const addItem = function ({commit}, ...arg) {
  commit(types.ADD_ITEM, ...arg)
}

export const removeItem = function ({commit}, ...arg) {
  commit(types.REMOVE_ITEM, ...arg)
}

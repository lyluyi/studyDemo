import { createStore, compose, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  // 创建store的时候  使用applyMiddleware 将thunk 注入
  applyMiddleware(thunk)
))

export default store
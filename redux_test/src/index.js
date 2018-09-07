import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker'

import configureStore from './store/configureStore'

import { Provider } from  'react-redux'


// 内置写法 logger

// const logger = store => next => action => {
//   console.log('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   console.log(result)
// }

// const error = store => next => action => {
//   try {
//     next(action)
//   } catch(e) {
//     console.log('error:' + e)
//   }
// }

// consot logger = function (store) {
//   return function (next) {
//     return function (action) {
//       console.log('disapatching', action)
//       let result = next(action)
//       console.log('next state', sotre.getState())
//       return result;
//     }
//   }
// }


// 注册服务 将combine合并的reducer注入 
// applyMiddleware  中间件 loggger error 注册

// 开发环境与生产环境配置

const store = configureStore()

console.log(process.env.NODE_ENV)

store.getState() // 返回应用当前的 state 树。它与 store 的最后一个 reducer 返回值相同

ReactDOM.render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Provider store = { store }>
        <App />
      </Provider>
    , document.getElementById('root'))
  });
}


registerServiceWorker();


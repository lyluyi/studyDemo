import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker'

import { createStore } from 'redux'  // 创建一个redux的store的服务
import rootReducer from './reducers'
import { Provider } from  'react-redux'

const store = createStore(rootReducer) // 注册服务 将combine合并的reducer注入

store.getState()

ReactDOM.render(
  <Provider store = { store }>
    <App />
  </Provider>
, document.getElementById('root'))

registerServiceWorker();


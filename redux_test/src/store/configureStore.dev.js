import { createStore, applyMiddleware} from 'redux'  // 创建一个redux的store的服务  引入中间件
import logger from 'redux-logger'
import thunk from 'redux-thunk'  // 异步action插件
import promise from 'redux-promise-middleware' // 处理异步的中间件
import { composeWithDevTools } from 'redux-devtools-extension';  // redux调试插件 方便在google中调试action
import rootReducer from '../reducers'


const configureStore = (preloadedState) => { 
  const store = createStore(
    rootReducer, 
    preloadedState, 
    composeWithDevTools(applyMiddleware(logger, thunk, promise()))
  )

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer)
      })
    }
  }
  
  return store
}

export default configureStore;

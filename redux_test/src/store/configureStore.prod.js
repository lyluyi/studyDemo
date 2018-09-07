import { createStore, applyMiddleware} from 'redux'  // 创建一个redux的store的服务 
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers'


const configureStore = (preloadedState) => { 
  const store = createStore(
    rootReducer, 
    preloadedState, 
    applyMiddleware(thunk, promise())
  )
  return store
}

export default configureStore;

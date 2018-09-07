import { combineReducers } from 'redux'

import counter from './counter'

import user from './user'

const rootReducer = combineReducers({
  counter, // counter: counter 可以在App.js中mapStateToProp 中查看state {counter: 1, user: "luyi"}
  user
})

// rootReducer 出来的counter是以键值对的形式存在

export default rootReducer
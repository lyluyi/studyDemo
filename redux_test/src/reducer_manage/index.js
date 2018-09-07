import { combineReducers } from 'redux'//将list 、detail、user等reducer组合起来(状态分而治之，便于管理)
import list from './list_reducer'
import detail from './detail_reducer'
import user from './user_reducer'
let reducers = combineReducers({
  list,
  detail,
  user
});
export default reducers

// import { combineReducers } from 'redux'  // 

import { combineReducers } from 'redux-immutable' 
// 使用redux-immutable库 将combinReducers中的state也变成inmmutable的数据类型

import { reducer as headerReducer } from '../common/header/store'

import  {reducer as homeReducer}  from '../pages/home/store'

// redux-immutable

const reducer =  combineReducers({
  header: headerReducer,
  home: homeReducer
})

export default reducer;
import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATE } from '../constants'

const games = (state = [], action = {}) => {
  switch (action.type) {
    // case FETCH_GAMES: 
    //   return state
    case SET_GAMES:
      return action.games
    case ADD_GAME:
      return [
        ...state,
        action.game 
      ]
    case GAME_UPDATE:
      console.log(state)
      console.log(action)
      return state.map(item => {
        if (item._id === action.game._id) return action.game // 传什么过来就返回什么 
        // 然后在GameForm.js中使用mapStateToProps 将state中的game 映射到 props中
        return item
      })
    case GAME_FETCHED:
    // action.game 从数据库查询返回查询的当前条数据 action.game._id
    // 本地 state 中的数据循环比对_id findexIndex 找出当前匹配项的索引
      const index = state.findIndex(item => item._id === action.game._id)
      if (index > -1) { // 匹配正确的情况 从服务端获取的数据 在本地state中已经存在
        return state.map(item => {
          if (item._id === action.game._id) return action.game // 传什么过来就返回什么 
          // 然后在GameForm.js中使用mapStateToProps 将state中的game 映射到 props中
          return item
        })
      } else {
        return [  // 从服务端获取的当前_id的game数据不存在时，将获取的数据混入本地state
          ...state,
          action.game
        ]
      }
    default:
      return state;
  }
};

export default games


/*
rr

export default (state = , action) => {
  switch (action.type) {
    case :
      
    default:
      return state;
  }
};

*/
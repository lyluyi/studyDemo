// action中 导入 规范定义的name 然后以return object的形式 用方法导出 方便dispatch使用
import axios from 'axios'
import { INCREMENT, DECREASE, FETCH_USER_SUCCESS, FETCH_USER_REQUEST, FETCH_USER_FAILURE, LOAD_USER } from  '../constants'

export const increment = (name) => {
  // 异步
  return  dispatch => {
      dispatch({
        type: INCREMENT
      })
  }

  // 使用异步promise 来写
  // return {
  //   type: INCREMENT,
  //   payload: new Promise((resolve, reject) => {
  //     setTimeout(() => {

  //     })
  //   })
  // }

  // return {
  //   type: INCREMENT,
  //   name
  // }
}

export const decrease = (name) => {
  return {
    type: DECREASE
  } 
}


export const get_user = (name) => {
  // //  引入thunk 中间件之后 return默认返回的obj 可以变成异步方法
  // return dispatch => {
  //   dispatch(fetch_user_request())
  //   axios.get('https://randomuser.me/sapi/')
  //    .then(res => {
  //       dispatch(fetch_user(res.data.results[0]))
  //    }).catch(error => {
  //       debugger
  //       console.log(error.response)
  //       dispatch(fetch_user_failure(error.response.data))
  //    })
  // }

  return {
    type: LOAD_USER,
    // payload: axios.get('https://randomuser.me/api/')  // 另一种写法 可以加参数 使用对象 promise
    payload: {
      promise: axios.get('https://randomuser.me/api/')
    }
  }
}

export const fetch_user = (user) => {
  console.log('===============action/index================')
  console.log(user)
  return {
    type: FETCH_USER_SUCCESS,
    user
  } 
}

export const fetch_user_failure = (error) => {
  // return 出来的就是 一个 action
  return {
    type: FETCH_USER_FAILURE,
    error
  }
}

export const fetch_user_request = () => {
  return {
    type: FETCH_USER_REQUEST
  }
}

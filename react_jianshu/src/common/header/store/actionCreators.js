import * as constans from './constants'

import { fromJS } from 'immutable'

import axios from 'axios'

const changeList = (data) => ({
  type: constans.CHANGE_LIST,
  data: fromJS(data), // 将data的[]数据类型转换为immutable数据类型
  totalPage: Math.ceil(data.length / 10)
})

export const searchFocus = () => ({
  type: constans.SEARCH_FOCUS
})

export const searchBlur = () => ({
  type: constans.SEARCH_BLUR
})

export const mouseEnter = () => ({
  type: constans.MOUSE_ENTER
})

export const mouseLeave = () => ({
  type: constans.MOUSE_LEAVE
})

export const changePage = (page) => ({
  type: constans.CHANGE_PAGE,
  page
})


export const getList = () => {
  // thunk 可以disptach 出一个函数 进行异步的操作
  return (dispatch) => {
    axios.get('/api/headerList.json').then((res) => {
      const data = res.data

      // 再次dispatch 派发出action给reducer
      dispatch(changeList(data.data))
    }).catch((err) => {
      console.log(err)
    })
  }
}
// action中 导入 规范定义的name 然后以return object的形式 用方法导出 方便dispatch使用

import { INCREMENT, DECREASE } from  '../constants'

export const increment = (name) => {
  return {
    type: INCREMENT,
    name
  }
}

export const decrease = () => {
  return {
    type: DECREASE
  } 
}
const counter = ( state = 1, action = {} ) => {
  switch (action.type) {
    case 'INCREMENT':
      console.log(action)
      console.log(action.name)
      // throw new Error('error in INCREMENT')
      return state + 1
    case 'DECREASE':
      return state - 1
    default: return state
  }
}

export default counter  //  定义各个模块的reducer 然后在recucer中的index.js中进行combine

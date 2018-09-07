// import * as types from './mutation-types'
// export const setToken = ({ dispatch }, token) => {
//   dispatch(types.SET_TOKEN, token)
// }
import * as types from './mutation-types.js'

/*
// obj => { name: 'zeng', age: 21 }
state.obj = { ...state.obj, newProp: 123 }
// ↓↓↓↓↓ 等同于 ↓↓↓↓↓
state.obj = { name: 'zeng', age: 21, newProp: 123 }


actions: {
    increment (context) {
      context.commit('increment')
    }
}

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 
提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
实践中，我们会经常会用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：

let obj={x:1,y:2};
 
let {x,y}=obj;//a=1,b=1
或者
let {x:a,y:b}=obj;//a=1,b=2

actions: {
  increment ({ commit }) {
    commit('increment')
  }
}

*/
export const changePrice = function({commit},...args) {
	commit(types.CHANGE_PRICE,...args)
}
export const changeStyle = function({commit},...args) {
	commit(types.CHANGE_STYLE,...args)
}
export const addItem = function({commit},...args) {
	commit(types.ADD_ITEM,...args)
}
export const removeItem = function({commit},...args) {
	commit(types.REMOVE_ITEM,...args)
}

/*
调用mutation方法对数据进行操作,

这里可以对数据进行一些复杂的操作，mutations中只是简单的数据操作
*/
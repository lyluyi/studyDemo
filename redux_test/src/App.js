import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { increment, decrease } from './actions'
import * as types from './actions'

import { bindActionCreators } from 'redux'  // 第三种  当actions 中 需要导入的对象过多时，可以使用这种写法

import User from './components/user'

//   src目录下，index.js入口。 
/*
 * 
 *  1. import { createStore } from 'redux'  
 * 
 *  const store = createStore() 
 *  // 初始化 store 
 * 
 *  store.getState() 
 * // 返回应用当前的 state 树。（每当store改变的情况下，更新挂载组件）它与 store 的最后一个 reducer 返回值相同
 * 
 * ReactDOM.render(<Provider store = { store }> <App /> </Provider>, document.getElementById('root')) 
 * // 提供全局的provider，使用provider的动机是让处于同一个树形结构中的组件都可以访问到共有的数据。
 * 这里的provider是由react-redux这个库直接提供的，并关联了一个store
 * 
 *  2. user,counter  import reducer/user.js /counter.js 
 *   
 *   //  将combine合并成rootReducer 
 *   counter.js user.js reducer 合并为 index.js rootReducer 
 *   rootReducer = combineReducer({
 *     counter,
 *     user 
 *   }) 
 * 
 *   import { createStore, applyMiddleware} from 'redux' 
 *   导入中间件服务  applyMiddleware
 *   applyMiddleware  中间件 loggger error 注册 thunk 异步处理注册
 * 
 *   注册 rootReducer 和 applyMiddleware 中间件
 *   const store = createStore(rootReducer, applyMiddleware(logger, thunk))
 * 
 *   reducer/ counter.js user.js 初始的 state 为 user，counter
 * 
 *   const user = (state = initiaState, action = {}) => ……
 *   const counter = ( state = 1, action = {} ) => ……
 * 
 *   因此， store.getState()，state = {counter: 1, user: {…}}
 * 
 *   而且 mapStateToProps 会将state 映射到 props, 并且 return 出store
 * 
 * 
 *   mapStateToProps是一个函数，用于建立组件跟store的state的映射关系
 *   作为一个函数，它可以传入两个参数，结果一定要返回一个object
 *   传入mapStateToProps之后，会订阅store的状态改变，在每次store的state发生变化的时候，都会被调用
 *   ownProps代表组件本身的props，如果写了第二个参数ownProps，那么当prop发生变化的时候，mapStateToProps也会被调用。
 *   例如，当 props接收到来自父组件一个小小的改动，那么你所使用的 ownProps 参数，mapStateToProps 都会被重新计算）。
 *   mapStateToProps可以不传，如果不传，组件不会监听store的变化，也就是说Store的更新不会引起UI的更新
 * 
 *   mapDispatchToProps 会将dispatch 方法映射到 props中
 *    
 *   const mapDispatchToProps = (dispatch) => ({
 *     ...bindActionCreators(types, dispatch),
 *   })
 *    
 *   实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。
 * 
 *   class MyReactComponent extends React.Component {}
 * 
 *  export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
 *   
 *  有了装饰器，就可以改写上面的代码。
 * 
 *  @connect(mapStateToProps, mapDispatchToProps)
 *   export default class MyReactComponent extends React.Component 
 *  
 *   @connect(mapStateToProps, mapDispatchToProps)  
 * 
*/

const mapStateToProps = (state, ownProps) => {  // state getState()  store传过来 state
  console.log(state)  // {counter: 1, user: "luyi"}
  return {
    counter: state.counter,  // counter 相当于 一个key 
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(types, dispatch),
})

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

  /*
    static 定义的是类的方法只有类能调用，而普通方法是实例的方法只有类实例能调用。变量也一样。
    从react的角度来说，这个可以写成BookBox.defaultProps =xxx ; BookBox.propTypes = xxx;
    跟java 一样，静态类，静态变量，内存中不消失
    staitc属于类属性
  */

  static propTypes =  {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired
  }
  render() {
    console.log(this.props)  // {counter: 1, user: "luyi", increment: ƒ, decrease: ƒ}

    // const { dispatch } = this.props // const dispatch = this.props.dispatch   第一种 mapStateToProps

    // 此处绑定 是因为要在组件中插值使用
    const { increment, decrease, get_user, fetch_user, user } = this.props
    // const { dispatch } = this.props
    // setTimeout(() => {
    //   dispatch({

    //   })
    // }, 5000);

    /*
    // 第一个参数
    const mapStateToProps = (state, ownProps) => {  // state getState()  store传过来 state
      console.log(state) 
      return {
        counter: state.counter,  // counter 相当于 一个key 
        user: state.user
      }
    }
    console.log(state)  {counter: 1, user: "luyi"}
    console.log(this.props)  {counter: 1, user: "luyi", dispatch: ƒ}

    // 第二个参数
    const mapDispatchToProps = (dispatch, ownProps) => {
      return {
        increment: () => { dispatch(increment) }
      }
    }

    console.log(state)  {counter: 1, user: "luyi"}
    console.log(this.props)  {counter: 1, user: "luyi", increment: ƒ}

    */
    return (
      <div className="container">
        <h1 className="jumtotron-heading text-center">{ this.props.counter }</h1>
        <p className="text-center">
          <button 
          onClick = { () => increment('Cranman') }
          className="btn btn-primary mr-2">Increase</button>
          <button 
          onClick = { () => decrease('luyi') }
          className="btn btn-danger my-2">Decrease</button>
        </p>
        <User get_user = { get_user } user = { user } fetch_user = { fetch_user } />
      </div>
    );
  }
}

// 将state遍历成props 以便数据流的展示

// const mapStateToProps = (state, ownProps) => {  // state getState()  store传过来 state
//   console.log(state)  // {counter: 1, user: "luyi"}
//   return {
//     counter: state.counter,  // counter 相当于 一个key 
//     user: state.user
//   }
// }

// 直接将dispatch 遍历到props中  进行更新

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     increment: (name) => { dispatch(increment(name)) }
//   }
// }



// const mapDispatchToProps = (dispatch) => ({
//   ...bindActionCreators(types, dispatch),
// })


/*
想要把store绑定在视图层上，得用到React-redux中的两个主角:Provider和Connect，
在api文档第一段话,作者说通常情况下你无法使用connect()去connect一个没有继承Provider的组件，
也就是说如果你想在某个子组件中使用Redux维护的store数据，它必须是包裹在Provider中并且被connect过的组件，
Provider的作用类似于提供一个大容器，将组件和Redux进行关联，在这个基础上，connect再进行store的传递。
*/
// export default connect(mapStateToProps, mapDispatchToProps)(App)  // connect 是一个高阶函数

// export default connect( mapStateToProps, { increment, decrease } )(App)

export default App;

// mapStateToProps 作为第一个参数 mapDispatchToProps 作为第二个参数

App.propTypes = {
  
}
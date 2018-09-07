import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { increment, decrease } from './actions'
import * as types from './actions'

import { bindActionCreators } from 'redux'  // 第三种  当actions 中 需要导入的对象过多时，可以使用这种写法


class App extends Component {
  render() {
    console.log(this.props)  // {counter: 1, user: "luyi", increment: ƒ, decrease: ƒ}

    // const { dispatch } = this.props // const dispatch = this.props.dispatch   第一种 mapStateToProps

    const { increment, decrease } = this.props

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
      </div>
    );
  }
}

// 将state遍历成props 以便数据流的展示

const mapStateToProps = (state, ownProps) => {  // state getState()  store传过来 state
  console.log(state)  // {counter: 1, user: "luyi"}
  return {
    counter: state.counter,  // counter 相当于 一个key 
    user: state.user
  }
}

// 直接将dispatch 遍历到props中  进行更新

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     increment: (name) => { dispatch(increment(name)) }
//   }
// }



const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(types, dispatch),
})


/*
想要把store绑定在视图层上，得用到React-redux中的两个主角:Provider和Connect，
在api文档第一段话,作者说通常情况下你无法使用connect()去connect一个没有继承Provider的组件，
也就是说如果你想在某个子组件中使用Redux维护的store数据，它必须是包裹在Provider中并且被connect过的组件，
Provider的作用类似于提供一个大容器，将组件和Redux进行关联，在这个基础上，connect再进行store的传递。
*/
// export default connect(mapStateToProps, mapDispatchToProps)(App)  // connect 是一个高阶函数

// export default connect( mapStateToProps, { increment, decrease } )(App)

export default connect( mapStateToProps, mapDispatchToProps)(App)

// mapStateToProps 作为第一个参数 mapDispatchToProps 作为第二个参数

App.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired
}
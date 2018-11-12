import React, { Component } from 'react';
import Header from './common/header'

import { Provider } from 'react-redux'

import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/home'
import Detail from './pages/detail'

import store from './store'




/*
react-router React Router 核心
react-router-dom 用于 DOM 绑定的 React Router
react-router-native 用于 React Native 的 React Router
react-router-redux React Router 和 Redux 的集成
react-router-config 静态路由配置帮助助手

*/

/*
  BrowserRouter: 使用HTML5历史记录API（pushState，replaceState和popstate事件）的<Router>来保持您的UI与URL同步。



*/



class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <div>
          <Header></Header>
          <BrowserRouter>
            <div>
              <Route path='/home' exact component = { Home } ></Route>
              <Route path='/detail'exact component = { Detail } ></Route>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;

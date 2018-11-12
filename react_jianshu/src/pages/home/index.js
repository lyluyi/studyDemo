import React, { Component } from 'react'

import Topic from './components/Topic'
import Recommend from './components/Recommend'
import List from './components/List'
import Writer from './components/Writer'

import { 
  HomeWrapper,
  HomeLeft,
  HomeRight
 } from './style'

class Home extends Component {
  render () {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className='banner_img' src="//upload.jianshu.io/admin_banners/web_images/4526/73a226693f83ee2920d31207c881b7c6eeb46761.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=""/>
          <Topic/>
          <List/>
        </HomeLeft>
        <HomeRight>
          <Recommend/>
          <Writer/>
        </HomeRight>
      </HomeWrapper>
    )
  }
}

export default Home;

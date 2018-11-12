import React, { Component } from 'react';
// import React from 'react';

import { connect } from 'react-redux'

import { CSSTransition } from  'react-transition-group'

import  { actionCreators }  from './store'

import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  Addtion,
  Button,
  SearchWrapper
} from './style'

// SearchInfo display true false

// const getListArea = (show) => {
//   if (show) {
//     return (
//       <SearchInfo>
//         <SearchInfoTitle>
//           热门搜索
//           <SearchInfoSwitch>换一批</SearchInfoSwitch>
//         </SearchInfoTitle>
//         <SearchInfoList>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//         </SearchInfoList>
//       </SearchInfo>
//     )
//   } else {
//     return null
//   }
// }

// 只有一个render函数的Header变成了一个无状态的组件
// const Header = (props) => {
//   return (
//     <HeaderWrapper>
//       <Logo></Logo>
//       <Nav>
//         <NavItem className="left active">首页</NavItem>
//         <NavItem className="left">下载APP</NavItem>
//         <NavItem className="right">登录</NavItem>
//         <NavItem className="right">
//           <i className="iconfont">&#xe636;</i>
//         </NavItem>
//         <SearchWrapper>
//           <CSSTransition
//             in = { props.focused }
//             timeout = { 200 }
//             classNames = "slide"
//           >
//             <NavSearch
//               className = { props.focused ? 'focused' : '' }
//               onFocus = { props.handleInputFocus }
//               onBlur = { props.handleInputBlur }
//             ></NavSearch>
//           </CSSTransition>
//           <i className = { props.focused ? 'focused iconfont' : 'iconfont' }>&#xe623;</i>
//         { getListArea(props.focused) }
//         </SearchWrapper>
//         <Addtion>
//           <Button className="reg">注册</Button>            
//           <Button className="writting">
//             <i className="iconfont">&#xe615;</i>
//             写文章
//           </Button>            
//         </Addtion>
//       </Nav>
//     </HeaderWrapper>
//   )
// }

class Header extends Component {

  // constructor (props) {
  //   super(props)

  //   this.state = {
  //     focused: false
  //   }
  //   this.handleInputFocus = this.handleInputFocus.bind(this)
  //   this.handleInputBlur = this.handleInputBlur.bind(this)
  // }

  // handleInputFocus () {
  //   // console.log(this.state)
  //   this.setState({
  //     focused: true
  //   })
  // }

  // 现在数据通过stroe 的 state存放 所以也就不需要this.state 以及 this.setState

  // handleInputBlur () {
  //   this.setState({
  //     focused: false
  //   })
  // }


  getListArea = () => {

    // const arr = [ <div>123123</div>, 2, 3, 4] // <div>123123</div> 存贮的是dom对象

    const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props
    const newList = list.toJS() // list 为 immutable对象
    const pageList = []

    if (newList.length) {
      // console.log(newList.length)
      let len = null;
      page * 10 > newList.length ? len = newList.length : len = page * 10
      for (let i = ((page - 1) * 10); i < len; i++ ) {
        pageList.push(
          <SearchInfoItem key = { newList[i] } > { newList[i] }</SearchInfoItem>
        )
      }
    }
    
    if (focused || mouseIn) {
      return (
        <SearchInfo 
          onMouseEnter = { handleMouseEnter }
          onMouseLeave = { handleMouseLeave }
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={ () => handleChangePage(page, totalPage, this.spinIcon) } >
              <i ref = { (icon) => { this.spinIcon = icon } } className="iconfont spin">&#xe851;</i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {
              // // 此时的this.list也为immutable数据
              // list.map((item) => {
              //   return <SearchInfoItem  key={ item } >{ item }</SearchInfoItem>
              // })
              pageList

            }
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null
    }
  }

  render () {
    const { focused, handleInputFocus, handleInputBlur, list} = this.props
    return (
      <HeaderWrapper>
        <Logo></Logo>
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载APP</NavItem>
          <NavItem className="right">登录</NavItem>
          <NavItem className="right">
            <i className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in = { focused }
              timeout = { 200 }
              classNames = "slide"
            >
              <NavSearch
                className = { focused ? 'focused' : '' }
                onFocus = { () => handleInputFocus(list) }
                onBlur = { handleInputBlur }
              ></NavSearch>
            </CSSTransition>
            <i className = { focused  ? 'focused iconfont zoom' : 'iconfont zoom' }>&#xe623;</i>
          { this.getListArea() }
          </SearchWrapper>
          <Addtion>
            <Button className="reg">注册</Button>            
            <Button className="writting">
              <i className="iconfont">&#xe615;</i>
              写文章
            </Button>            
          </Addtion>
        </Nav>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {

    focused: state.getIn(['header', 'focused']), // immutable提供的API另一种写法 不能..的属性JS写法 这里是immutable写法
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn'])

    // focused: state.get('header').get('focused') 
    // // state.focused 指的是stroe的focused
    // // 使用redux-immutable库后 reducer中的state也变成了immutable数据类型 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus (list) {
      (list.size === 0) && dispatch(actionCreators.getList())
      // redux thunk
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur () {
      // const action = {
      //   type: 'search_blur'
      // }
      dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter () {
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave () {
      dispatch(actionCreators.mouseLeave())
    },
    handleChangePage (page, totalPage, spin) {
      // console.log(spin)
      let originAngel = spin.style.transform.replace(/[^0-9]/ig, '')
      if (originAngel) {
        originAngel = parseInt(originAngel, 10)
      } else {
        originAngel = 0
      }
      console.log(originAngel)
      debugger
      spin.style.transform = `rotate(${originAngel + 360}deg)`
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page +1))
      } else {
        dispatch(actionCreators.changePage(1))
      }
      // dispatch(actionCreators.changePage())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

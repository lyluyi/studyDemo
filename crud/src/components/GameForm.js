import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { saveGame, fetchGame, updateGame } from '../actions'

class GameForm extends Component {
  state = {
    _id: this.props.game ? this.props.game._id : null,
    title: this.props.game ? this.props.game.title : '',
    cover: this.props.game ? this.props.game.cover : '',
    error: {},
    loading: false,
    done: false 
  }

  componentDidMount () {
    console.log(this.props)
    /*
      {match: {…}, location: {…}, history: {…}, staticContext: undefined, saveGame: ƒ}
          history
          :
          {length: 50, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
          location
          :
          {pathname: "/game/5b7238858da4114aa83816de", search: "", hash: "", state: undefined, key: "e4ys5j"}
          match
          :
          {path: "/game/:_id", url: "/game/5b7238858da4114aa83816de", isExact: true, params: {…}}
          saveGame
          :
          ƒ ()
          staticContext
          :
          undefined
          __proto__
          :
          Object
    */
    const { match } = this.props
    if (match.params._id) {
      if (match.params._id) {
        console.log("_id:" + match.params._id)
        this.props.fetchGame(match.params._id)
      }
    }
  }

  componentWillReceiveProps (nextProps) { 
    // 返回的_id title cover 都在game里面 但是是异步数据流 需要用到这种生命周期函数
    // render 时  state初始化 异步流的数据并无法获取
    this.setState({
      _id: nextProps.game._id,
      title: nextProps.game.title,
      cover: nextProps.game.cover
    })
  }

  handleChange = (e) => {
    let error = {}
    if (e.target.value) {
      error[e.target.name] = ''
      this.setState({
        error: Object.assign({},this.state.error, error)  // 重新生成的对象改变，并不会改变clone对象的value
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault(); // 阻止form submit行为  
    
    let error = {}
    if (!this.state.title) {
      error.title = 'Title not be empty!'
    }
    if (!this.state.cover) {
      error.cover = 'Cover not be empty!'
    }
    this.setState({ error })

    const isValid = Object.keys(error).length === 0

    if (isValid) {
      // 此时分两种情况 1.创建一条新的记录 2.修改从当前记录
      // 根据路由页面上的经过一系列处理的_id字段有无进行判断
      console.log(this.state)
      const { _id, title, cover } = this.state
      this.setState({
        loading: true
      })
      if (_id) {
        // 修改记录
        this.props.updateGame({ _id, title, cover }).then(
          () => { this.setState({ done: true }) }, // 成功时
          (err) => err.response.json().then(({ error }) => { this.setState({ error, loading: false }) })
        )
      } else {
        // 创建记录
        this.props.saveGame({ title, cover }).then(
          () => { this.setState({ done: true }) }, // 成功时
          (err) => err.response.json().then(({ error }) => { this.setState({ error, loading: false }) })
        )
      }
      
    }
  }
  
  render() {
    const form = (
      <form className={ classnames( 'ui', 'form', { loading: this.state.loading }) } 
        onSubmit={ this.handleSubmit }>
        <h1>Add new game</h1>
        {/* !!this.state.error.title  表示一个boolean */}

        { !!this.state.error.global && <div className="ui negative message">{ this.state.error.global }</div> }

        <div className={ classnames('field', { error: !!this.state.error.title }) }>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={ this.state.title }
            onChange={ this.handleChange }
          />
          <span>{ this.state.error.title }</span>
        </div>

        <div className={ classnames('field', { error: !!this.state.error.cover }) }>
          <label htmlFor="cover">Cover Url</label>
          <input 
            type="text"
            name="cover"
            value={ this.state.cover }
            onChange={ this.handleChange }
          />
          <span>{ this.state.error.cover }</span>
        </div>

        <div className="field">
          { this.state.cover ? <img src={ this.state.cover } alt="cover" className="ui samll bordered image"/> : '' }
        </div>

        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    )
    return (
      <div>
        { this.state.done ? <Redirect to="/games" /> : form }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props
  if (match.params._id) { // 当前路由地址上有id
    return {
      game: state.games.find(item => item._id === match.params._id)
    }
  }
  return { game: null }
}

export default connect(mapStateToProps, { saveGame, fetchGame, updateGame })(GameForm)  // connect 接入react-redux 

// mapStateToProps: null  mapDispatchToProps: { saveGame }

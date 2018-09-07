import React, { Component } from 'react';
import  { connect } from 'react-redux'
import { addReminder, deleteReminder, clearReminder } from  '../actions'

import moment from 'moment'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder () {
    // 类中定义自己的方法 通过方法的形式 将用户行为保存在 this.state 中 然后actions 给store中的state
    this.props.addReminder(this.state.text, this.state.dueDate)
    console.log(this.state)
  }

  deleteReminder (id) {
    this.props.deleteReminder(id)
  }

  clearReminder () {
    this.props.clearReminder()
  }

  renderReminders () {
    const { reminders } = this.props
    return (
      <ul className="list-group col-sm-8 mt-2" >
      {  
        reminders.map((reminder, index) => {
          return (
            <li className="lsit-group-item" key = {index} >
              <div className="list-item">
                <div>{ reminder.text }</div>
                <div><em>{ moment(new Date(reminder.dueDate)).fromNow() }</em></div>
              </div>
              <div className="list-item delete-button"
              onClick = { () => this.deleteReminder(reminder.id)}
              >X</div>
            </li>
          )
        })
      }
      </ul>
    )
  }
  
  render() {
    return (
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline">
          <div className="form-group mr-2">
            <input type="text" className="form-control" placeholder="I have to..."
            onChange = { (e) => this.setState({ text: e.target.value }) }
            />
            <input type="datetime-local" className="form-control"
            onChange={ (e) => this.setState({ dueDate: e.target.value }) }
            />
          </div>
          <button type="button" className="btn btn-success" 
          onClick = { (e) => this.addReminder() }
          >Add Reminder</button>
          <button type="button" className="btn btn-danger" 
          onClick = { (e) => this.clearReminder() }
          >Clear Reminder</button>
        </div> 
        { this.renderReminders() } 
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    reminders: state
  }
}

// mapStateToProps mapDispatchToProps
//  这里没有使用mapStateToProps 为 null 
// 第二个参数 mapDispatchToProps 映射到props里面的方法为  import { addReminder } from '../actions'
export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminder })(App)

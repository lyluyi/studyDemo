import React, { Component } from 'react'

import * as RecordsAPI from '../utils/RecordsAPI'

export default class RecordForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      title: '',
      amount: ''
    }
    console.log(this.props)
  }

  void() {

    return this.state.date && this.state.title && this.state.amount
  }

  handleSubmit (event) {
    event.preventDefault()
    let param = this.state
    RecordsAPI.createRecords(param).then(res => {
      this.props.HasRecordCreate(res)
      this.setState({
        date: '',
        title: '',
        amount: ''
      })
    }).catch(err => {
      console.log(err)
    })
  }

  handleChange (event) {
    console.log(event.target.value)
    switch(event.target.name) {
      case 'date' :
      this.setState({
        date: event.target.value
      },
    )
        break;
      case 'title' : 
      this.setState({
        title: event.target.value
      })
        break;
      case 'amount' : 
      this.setState({
        amount: event.target.value
      })
        break;
      default :
        return;
    }
    console.log(this.state, event.target)
  }

  render() {
    console.log(this.props)
    return(
      <form className="form-inline" onSubmit ={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" className="form-control" value={this.state.date} onChange={this.handleChange.bind(this)} placeholder="Date" name="date"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" value={this.state.title} onChange={this.handleChange.bind(this)} placeholder="Title" name="title"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" value={this.state.amount} onChange={this.handleChange.bind(this)} placeholder="amount" name="amount"/>
        </div>
        <button type="submit" className="btn btn-info" disabled = {!this.void()}>Create Record</button>
      </form>
    )
  }
}

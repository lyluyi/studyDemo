import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import * as RecordsAPI from '../utils/RecordsAPI'

export default class Record extends Component {
  constructor (props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  RecordRow () {
    return (
      <tr>
          <td>{this.props.date}</td>
          <td>{this.props.title}</td>
          <td>{'$ ' + this.props.amount}</td>
          <td>
            <button className="btn btn-info" onClick = {this.handleToggle.bind(this)}>Edit</button>
            <button className="btn btn-danger" onClick = {this.handleDelete.bind(this)}>Delete</button>
          </td>
      </tr>
    )
  }

  updateChange () {
    console.log(this.props)
    let record = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: this.refs.amount.value,
    }
    RecordsAPI.updateRecords(this.props.id, record).then(res => {
      console.log(res)
      this.props.c_updateChange(res.data)
      this.setState({
        edit: !this.state.edit
      })  
    }).catch(
      err => console.log(err)
    )
  }

  RecordForm () {
    return (
      <tr>
          <td>
            <input type="text" className="form-control" 
            defaultValue ={this.props.date}
            ref="date"
            />
          </td>
          <td>
            <input type="text" className="form-control" 
            defaultValue ={this.props.title}
            ref="title"
            />
          </td>
          <td>
            <input type="text" className="form-control" 
            defaultValue ={this.props.amount}
            ref="amount"
            />
          </td>
          <td>
            <button className="btn btn-info" onClick = {this.updateChange.bind(this)}>Update</button>
            <button className="btn btn-danger" onClick = {this.handleToggle.bind(this)}>Cancle</button>
          </td>
      </tr>
    )
  }

  handleToggle () {
    this.setState({
      edit: !this.state.edit
    })
  }

  handleDelete () {
    console.log(this.props)
    RecordsAPI.deleteRecords(this.props.id, this.props.record).then(res => {
      this.props.c_deleteChange(this.props.id)
    })
  }

  render() {
    if (this.state.edit) {
      return this.RecordForm()
    } else {
      return this.RecordRow()
    }
  }
}

// Record.propTypes = {
//   id: PropTypes.number,
//   date: PropTypes.string,
//   title: PropTypes.string,
//   amount: PropTypes.number
// }

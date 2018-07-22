import React, { Component } from 'react'

import Record from './Record'
import RecordForm from './RecordForm'
import RecordTotal from './RecordTotal'

import * as RecordsAPI from '../utils/RecordsAPI'

export default class Records extends Component {
  constructor () {
    super()
    this.state = {
      error: null,
      records: [],
      isLoaded: false
    }
  }
  componentDidMount () {
    RecordsAPI.getRecords().then(
      response => this.setState ({
        records: response.data,
        isLoaded: true
      })
      // response => console.log(response)
    ).catch(
      error => this.setState ({
        isLoaded: true,
        error: error
      })
    )
   
    // $.getJSON("http://localhost:3004/records",function(res){
    //   console.log(res)
    // })
  }

  addRecord (recordNews) {
    console.log(recordNews.data)
    console.log(this.state.records)
    this.setState({
      error: null,
      records: [
        ...this.state.records,
        recordNews.data
      ],  // this.state.records.concat(recordNews.data) 但是不能直接push push返回的是一个长度
      isLoaded: true
    },
      () => {
        console.log(this.state.records)
      }
    )
  }

  p_updateChange (res) {
   const newRocord = this.state.records.map(item => {
      if (item.id === res.id) {
        return {
          ...item,
          ...res
        }
      } else {
        return item
      }
    })
    this.setState({
      records: newRocord
    })
  }

  p_deleteChange (id) {
    let newArr = this.state.records
    // let index;
    // debugger
    for (let i = 0; i < newArr.length; i++) {
      // debugger
      if (newArr[i].id === id) {
        // index = i
        newArr.splice(i, 1)
        i--;
      }
    }
    this.setState({
      records: newArr
    })
  }

  render() {
    const {error, isLoaded, records} = this.state
    console.log(records)
    let recordsComponent;
    if (error) {
        recordsComponent = <div>Error: {error.message} </div>
    } else if (!isLoaded) { // 先construct 再render 最后componentDidMount
        recordsComponent = <div>Loading...</div>
    } else {
      recordsComponent = (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Aciton</th>
              </tr>
            </thead>
            <tbody>
              {
                records.map((record, i) => {
                  console.log(record)
                  return <Record {...record} key={i}
                  c_updateChange = {this.p_updateChange.bind(this)}
                  c_deleteChange = {this.p_deleteChange.bind(this)} 
                  />
                })
              }
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <div>
        <RecordTotal records = {this.state.records}></RecordTotal>
        <h2>Records</h2>
        <RecordForm 
        records = {this.state.records} 
        HasRecordCreate = {this.addRecord.bind(this)}
        >
        </RecordForm>
        {recordsComponent}
      </div>
    )
  }
}

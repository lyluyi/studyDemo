import React, { Component } from 'react'

export default class RecordTotal extends Component{
  render () {
    let [income , expend, balance] = [0, 0, 0]
    console.log(this.props)
    this.props.records.map(item => {
      if (Number.parseInt(item.amount, 0) > 0) {
        income += Number.parseInt(item.amount, 0)
        return '';
      } else {
        expend += Number.parseInt(item.amount, 0)
        return '';
      }
    })
    console.log(income)
    balance = income + expend
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-success">
              <div className="panel-heading" role="tab" id="headingOne">
                <h4 className="panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    收入
                  </a>
                </h4>
              </div>
              <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div className="panel-body">
                    {`$ ${income}`}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-danger">
              <div className="panel-heading" role="tab" id="headingOne">
                <h4 className="panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion"  aria-expanded="true" aria-controls="collapseOne">
                    支出
                  </a>
                </h4>
              </div>
              <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div className="panel-body">
                {`$ ${expend}`}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-info">
              <div className="panel-heading" role="tab" id="headingOne">
                <h4 className="panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion"  aria-expanded="true" aria-controls="collapseOne">
                    收支平衡
                  </a>
                </h4>
              </div>
              <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div className="panel-body">
                {`$ ${balance}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
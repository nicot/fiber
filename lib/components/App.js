import React, {Component, PropTypes} from 'react'


import FiberMap from './FiberMap'
import FiberCostTable from './FiberCostTable'
import AddressFinder from './AddressFinder'
import History from './History'

export default class App extends Component {

  render(){
    return <div className="row">
        <div className="col s4">
          <AddressFinder {...this.props}/>
          <FiberCostTable {...this.props}/>
        </div>
        <div className="col s6">
          <FiberMap {...this.props}/>
        </div>
        <div className="col s2">
          <History {...this.props}/>
        </div>
      </div>
  }
}

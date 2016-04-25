import React, {Component, PropTypes} from 'react'


import FiberMap from './FiberMap'
import FiberCostTable from './FiberCostTable'
import AddressFinder from './AddressFinder'
import History from './History'
import Banner from './Banner'


export default class App extends Component {

  render(){
    return <div>
      <div>
        <Banner {...this.props}/>
      </div>
      <div className="row">    
        <div className="col s4">
          <FiberCostTable {...this.props}/>
        </div>
        <div className="col s8">
          <FiberMap {...this.props}/>
        </div>
      </div>
    </div>
  }
}

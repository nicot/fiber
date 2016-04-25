import React, {Component, PropTypes} from 'react'

import _ from 'lodash'

// React component for visualizing fiber locations on a map
export default class FiberCostTable extends Component {

  render(){
    const { fibers } = this.props

    const rowHeaders = <div style={{backgroundColor: 'LightGrey', overflow:'hidden'}}>
        <div className="col s2"> ID </div>
        <div className="col s5"> Cost($) </div>
        <div className="col s5"> Distance(m) </div>
    </div>

    fibers.map((fiber, index) => fiber.key = index)
    fibers.sort((a, b) => a.cost - b.cost)
    var rowElements = fibers.map((fiber) => {

      const className = !fiber.isSelected ? 'row' : 'row orange'

      return <div key={fiber.key} className={className} style={{marginBottom:0}}>
        <div className="col s2"> {fiber.key} </div>
        <div className="col s5"> {
            fiber.cost ? fiber.cost.toFixed(0) : ""
                                 } </div>
        <div className="col s5"> {fiber.distance} </div>
      </div>

    })
    return <div>
      { rowHeaders }
      { rowElements }
    </div>

  }

}

import React, {Component, PropTypes} from 'react'

import _ from 'lodash'

export default class History extends Component {

    render(){
        var {history} = this.props
        var isEmpty = history.length === 0;
        if (!isEmpty) {
            const rowHeader = <div style={{backgroundColor: 'LightGrey', overflow:'hidden'}}>
            <div className="col s2"> id </div>
            <div className="col s10"> lat </div>
            </div>
            var rowElements = history.map((his,i) => {
            console.log("i: " + i + " his: "+ his);
            return 
            <div key={i} className="row">
                <div className="col s2"> {i} </div>
                <div className="col s10"> {his.lat}</div>
            </div>

            })

            return <div>
            {rowHeader }
            { rowElements }
            </div>
        }
        return <div>
        <h4>No History yet...</h4>
        </div>
        
    
    }
}


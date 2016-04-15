import React, {Component, PropTypes} from 'react'

import _ from 'lodash'

export default class History extends Component {

    render(){
        const {history} = this.props
        var isEmpty = history.length === 0;
        if (!isEmpty) {
            const rowHeader = <div style={{backgroundColor: 'LightGrey', overflow:'hidden'}}>
            <div className="col s2"> id </div>
            <div className="col s10"> lat </div>
            </div>
            const rowElements = history.map((his,i) => {
            console.log("i: " + i + " his.lat: "+ his.lat);

                return 
                <div key={i} className="row" style={{marginBottom:0}}>
                    <div className="col s2"> {i} </div>
                    <div className="col s10">{his.lat}</div>
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


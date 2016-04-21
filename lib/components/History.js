import React, {Component, PropTypes} from 'react'
import _ from 'lodash'

export default class History extends Component {
    
    render(){
        var { history } = this.props
        var isEmpty = history.length === 0;
        if (!isEmpty) {
            const title = <div className="row orange">History</div>
            const rowHeader = <div style={{backgroundColor: 'LightGrey', overflow:'hidden'}}>
            <div className="col s2"> id </div>
            <div className="col s10"> position </div>
            </div>
            const className = "row";
            var rowElements = history.map((his,i) => {
            
            return(<div key={i} className={className} style={{marginBottom:0}}>
                <div className="col s2"> {i} </div>
                 <div className="col s2"> {his.lat},{his.lng} </div>
            </div>) 
            

            })

            console.log(rowElements)

            return <div>
            {title }
            { rowHeader }
            { rowElements }
            </div>
        }
        return <div>
        <h4>No History yet...</h4>
        </div>
        
    
    }
}


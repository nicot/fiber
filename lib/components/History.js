import React, {Component, PropTypes} from 'react'
import _ from 'lodash'

export default class History extends Component {
    constructor() {
        super()
        this.state = {latlng: ""}
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    handleUpdate(his) {
        this.props.updateAddress(his)
    }
    
    render(){
        var { history } = this.props
        var isEmpty = history.length === 0;
        var rowElements;
        if (!isEmpty) {
            const title = <h4 className="row orange center white-text">History</h4>
            const rowHeader = <div style={{backgroundColor: 'LightGrey', overflow:'hidden'}}>
            <div className="col s12 center"> Addresses </div>

            </div>
            const className = "waves-effect waves-light btn-large white-text";
            rowElements = history.map((his,i) => {
              return(<a key={i} className={className} style={{backgroundColor: '#008795'}}
               href="#" onClick={()=>this.handleUpdate(his)}  data-activates="slide-in" required value={this.props.address}
                   placeholder="address"><i className="material-icons left">room</i>{his}</a>
            ) 
            })
            return (<div>
            {title }
            { rowHeader }
            <ul>
            { rowElements }
            </ul>
            </div>)
        }
        else{
            return (<div> <h4>No History yet....</h4></div>)
        }
        
    
    }
}


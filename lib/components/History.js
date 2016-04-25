import React, {Component, PropTypes} from 'react'
import _ from 'lodash'

export default class History extends Component {
    constructor() {
        super()
        this.state = {latlng: ""}
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    handleUpdate(e) {
        this.setState({latlng: latlng})
        const address = e.target.value
        this.props.updateAddress(address)
    }
    
    render(){
        var { history } = this.props
        var isEmpty = history.length === 0;
        var rowElements;
        if (!isEmpty) {
            const title = <div className="row orange">History</div>
            const rowHeader = <div style={{backgroundColor: 'LightGrey', overflow:'hidden'}}>
            <div className="col s12"> Address </div>
            </div>
            const className = "row";
            rowElements = history.map((his,i) => {
              return(<div key={i} className={className} style={{color: 'Black'}}>
              <a href="#" onclick={this.handleUpdate}  data-activates="slide-in" required value={this.props.latlng}
                   placeholder="latlng">{his}</a>
            </div>) 
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


import React, {Component, PropTypes} from 'react'

import _ from 'lodash'

export default class History extends Component {

    render(){
        const { history } = this.props;

        const rowElements = history.map((his,i) => {

        return 
        <div key={i} className='row'>
            <div className="col s2"> {i} </div>
            <div className="col s5"> { his.lat },{ his.lng }</div>
        </div>

        })

        return <div>
        { rowElements }
        </div>
    
    }
}


import React, {Component, PropTypes} from 'react'

import _ from 'lodash'

export default class Banner extends Component {

    constructor() {
        super()
        this.state = {address: ""}
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentDidMount() {
        $(".button-collapse").sideNav({
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true,
            }
        );
    }

    handleUpdate(e) {

        if(e && e.keyCode == 13)
        {
          console.log("Enter")
          this.setState({address: address})
          const address = e.target.value
          this.props.updateAddress(address)
        }
    }

    render(){
      var { history } = this.props
        var isEmpty = history.length === 0;
        var rowElements;
        if (!isEmpty) {
            const title = <div className="row orange">History</div>
            const rowHeader = <div style={{backgroundColor: 'LightGrey', overflow:'hidden'}}>
            <div className="col s2"> id </div>
            <div className="col s10"> position </div>
            </div>
            const className = "row";
            rowElements = history.map((his,i) => {
              return(<div key={i} className={className} style={{color: 'Black'}}>
              <a href="#"  data-activates="slide-in">{his}</a>
            </div>) 
            })
        }
        else{
          rowElements = <h4>No History yet...</h4>
        }
        return <div className="row">
        <nav>
            <div className="nav-wrapper blue">
              <div className="left">
                  <ul id="slide-out" className="side-nav left">
                    {rowElements}
                  </ul>
                  <a href="#" data-activates="slide-out" className="button-collapse show-on-large"><i className="medium material-icons">schedule</i></a>
              </div>
              <a href="#" className="brand-logo center">Zayo Fiber Pricer</a>
              <form>
                <div className="input-field right col s4" >
                  <input id="search" type="search" required value={this.props.address}
                   placeholder="Address"
                   onKeyDown={this.handleUpdate}/>
                  <label htmlFor="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
            </div>
          </nav>
        </div>
    }
}


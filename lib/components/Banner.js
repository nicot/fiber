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
            closeOnClick: true
            }
        );
    }

    handleUpdate(e) {
        this.setState({address: address})
        const address = e.target.value
        this.props.updateAddress(address)
    }

    render(){
        return <div className="row">
        <nav>
            <div className="nav-wrapper blue">
              <div className="left">
                  <ul id="slide-out" className="side-nav left">
                    <li><a href="#">First Sidebar Link</a></li>
                    <li><a href="#">Second Sidebar Link</a></li>
                  </ul>
                  <a href="#" data-activates="slide-out" className="button-collapse show-on-large"><i className="medium material-icons">schedule</i></a>
              </div>
              <a href="#" className="brand-logo center">Zayo Fiber Pricer</a>
              <form>
                <div className="input-field right col s4" >
                  <input id="search" type="search" required value={this.props.address}
                   placeholder="Address"
                   onChange={this.handleUpdate}/>
                  <label nameFor="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
            </div>
          </nav>
        </div>
    }
}


import React, {Component, PropTypes} from 'react'

import _ from 'lodash'

export default class Banner extends Component {

    componentDidMount() {
        $(".button-collapse").sideNav({
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true
            }
        );
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
                  <input id="search" type="search" required></input>
                  <label labelFor="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
            </div>
          </nav>
        </div>
    }
}


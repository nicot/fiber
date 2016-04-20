import React, {Component, PropTypes} from 'react'

import _ from 'lodash'

export default class Banner extends Component {

    render(){
        return <div className="row">
        <nav>
            <div className="nav-wrapper blue">
             <div className="left">
                  <ul id="slide-out" className="side-nav">
                    <li><a href="#!">First Sidebar Link</a></li>
                    <li><a href="#!">Second Sidebar Link</a></li>
                  </ul>
                  <a href="#" data-activates="slide-out" className="button-collapse show-on-large"><i className="medium material-icons">schedule</i></a>
              </div>
              <form>
                <div className="input-field right col s4" >
                  <input id="search" type="search" required></input>
                  <label for="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
              <a href="#" className="brand-logo center">Zayo Fiber Pricer</a>
            </div>
          </nav>
        </div>
    }
}


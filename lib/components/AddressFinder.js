import React, {Component, PropTypes} from 'react'

export default class AddressFinder extends Component {
    constructor() {
        super()
        this.state = {address: ""}
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate(e) {
        this.setState({address: address})
        const address = e.target.value
        this.props.updateAddress(address)
    }

    render(){
        return <div>
            <input value={this.props.address}
                   placeholder="Address"
                   onChange={this.handleUpdate}/>
        </div>
    }
}

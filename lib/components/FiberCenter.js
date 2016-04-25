import React, {Component, PropTypes} from 'react'
import { Map, Marker, Popup, TileLayer, Polyline, LayerGroup, Path, CircleMarker } from 'react-leaflet'

export default class FiberCenter extends Component {

	// componentDidMount(){
	//     console.log("Test TESt!")

	//     this.refs.foo.bindPopup("Popup content");
	//     this.refs.foo.on('mouseover', function (e) {
	//         this.openPopup();
	//     });
	//     this.refs.foo.on('mouseout', function (e) {
	//         this.closePopup();
	//     });
	// }

	popup () {
		Materialize.toast("Fiber ID: " + this.props.id, 2000)
    }


  	render(){
	
	  	const { map, center, id } = this.props
		
		const centerLatlng = [center.latitude, center.longitude]
	
	  	const centerElement = <CircleMarker ref="foo" center={centerLatlng} map={map} color='#a00' radius={5} onMouseOver={()=>this.popup()}/>
	    
	    return centerElement
  	}

}

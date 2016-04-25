import React, {Component, PropTypes} from 'react'
import { Map, Marker, Popup, TileLayer, Polyline, LayerGroup, Path } from 'react-leaflet'
import _ from 'lodash'

import FiberGeometry from './FiberGeometry'
import FiberCenter from './FiberCenter'

export default class FiberLayerGroup extends Component {

  render(){

    // Q: How does each property get provided?
    const { map, fibers, selectedPosition, newFibers} = this.props

    const geometryElements = _.map(fibers, (fiber,i) => {

      // Add logic here to highlight the selected fiber in blue
      // hint: check the flag: fiber.isSelected and set the color accordingly
      var color = ''
      if (fiber.isSelected) {
        color = 'red'
      } else {
        color = 'blue'
      }

      return <FiberGeometry geometry={fiber.geometry} selectedPosition={selectedPosition} key={i} map={map} color={color}/>
      // Q: Why do we have to specify map={map}?
      // Q: Why do we have to specify key={i}?
    })

    var centerElements = _.map(fibers, (fiber,i) => {

        return <FiberCenter center={fiber.center} key={i} map={map} color={'#a00'}/>
      // Q: Why do we have to specify map={map}?
      // Q: Why do we have to specify key={i}?
    })
    centerElements.push( _.map(newFibers, (fiber,i) => {
      return <FiberCenter center={fiber.center} key={i} map={map} color={'orange'}/>
    }))

    return <LayerGroup map={map}>
      { geometryElements }
      { centerElements }
    </LayerGroup>
  }

}

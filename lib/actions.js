import store from './store'
import refresh from './refresh'
import _ from 'lodash'
import geolib from 'geolib'
import $ from 'jquery'
import { NEARBY_METERS } from './constants'

//
// Action functions
//

// Action to load fiber data asynchrnously
export function loadDataAsync() {

    $.ajax('/data/boulder.json').done(function(json) {
        store.geometries = json

        let fibers = {}

        store.fibers = _.map(json, (d) => {

            const center = geolib.getCenter(d.coordinates);

            return {
                geometry: d,
                center: center
            }
        })

        refresh()
    })
}

// Action to set a position selected by the user
export function setSelectedPosition(latlng) {
    store.selectedPosition = latlng
    store.history.push(store.selectedPosition);

    _.forEach(store.fibers, forEachFiberSetIsSelected)

    _.forEach(store.fibers, forEachFiberSetCost)

    refresh()
}

//
// private helper function
//

// helper to set each fiber's 'isSelected' flag based on whether this fiber is
// nearby with respect to the position selected by the user
function forEachFiberSetIsSelected(fiber) {

    // Implement the logic to set fiber.isSelected if the fiber's geometry center
    // is within a certain distance from the selected position 'NEARBY_METERS'
    // hint: use geolib.getDistance()

    fiber.distance = geolib.getDistance(store.selectedPosition, fiber.center)
    if (fiber.distance <= NEARBY_METERS) {
        fiber.isSelected = true;
    } else {
        fiber.isSelected = false;
    };

}

// helper to set the cost of connecting this fiber to the selected position
function forEachFiberSetCost(fiber) {
    fiber.cost = fiber.distance * 2
}

export function updateAddress(address) {
    var g = new google.maps.Geocoder();
    g.geocode({address: address}, addressUpdated);
}

function addressUpdated(response) {
    if (!response || response.length == 0) {
        return
    }
    const l = response[0].geometry.location
    const coords = {lat: l.lat(), lon: l.lng()}
    setSelectedPosition(coords)
    refresh()
}

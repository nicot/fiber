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

    const router = L.Routing.osrm();

    const waypoints = [
        {latLng: L.latLng(store.selectedPosition)},
        {latLng: L.latLng(fiber.center.latitude, fiber.center.longitude)}
    ];
    /* if (!route) {
       return
       }
     */
    router.route(waypoints, function(error, routes) {
        console.log(routes);
        const route = routes[0];
        fiber.distance = route.summary.totalDistance;
        fiber.isSelected = fiber.distance <= NEARBY_METERS;
        render();
    });
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

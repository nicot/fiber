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
    decodeAddress(latlng);
    let wg = store.fibers.length;
    const maybeRefresh = function() {
        wg = wg - 1;
        if (wg == 0) {
            refresh();
        }
        return;
    };

    _.forEach(store.fibers, removeOldRoutes)
    _.forEach(store.fibers, setIsSelected(maybeRefresh))

    refresh()
}

function removeOldRoutes(fiber) {
    if (fiber.route) {
        fiber.route.spliceWaypoints(0, 2)
    }
}

//
// private helper function
//

// helper to set each fiber's 'isSelected' flag based on whether this fiber is
// nearby with respect to the position selected by the user
function setIsSelected(maybeRefresh) {
    return function(fiber) {
        // Implement the logic to set fiber.isSelected if the fiber's geometry center
        // is within a certain distance from the selected position 'NEARBY_METERS'
        // hint: use geolib.getDistance()

        const router = L.Routing.osrm();

        const waypoints = [
            {latLng: L.latLng(store.selectedPosition)},
            {latLng: L.latLng(fiber.center.latitude, fiber.center.longitude)}
        ];
        router.route(waypoints, function(err, routes) {
            if (err) {
                maybeRefresh();
                return;
            }
            const route = routes[0];
            fiber.distance = route.summary.totalDistance;
            fiber.isSelected = fiber.distance <= NEARBY_METERS;
            setCost(fiber);
            if (fiber.isSelected) {
                fiber.route = L.Routing.control({
                    waypoints: waypoints,
                    fitSelectedRoutes: false,
                    routeWhileDragging: false,
                    show: false,
                    createMarker: () => null,

                    lineOptions: {
                        styles: [
                            {color: 'purple', opacity: 0.15, weight: 9},
                            {color: 'white', opacity: 0.8, weight: 6},
                            {color: 'green', opacity: 0.5, weight: 20}
                        ]
                    }
                });
                /* store.map.removeControl(fiber.route); */
                fiber.route.addTo(store.map);
            }
            maybeRefresh();
        });
    };
}

// helper to set the cost of connecting this fiber to the selected position
function setCost(fiber) {
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
    setSelectedPosition(coords);
    decodeAddress(coords);
    refresh()
}
export function decodeAddress(latlng){
    var g = new google.maps.Geocoder();
    g.geocode({'location': latlng}, decodedAddress);
}
function decodedAddress(response){
    if (!response || response.length == 0) {
        return
    }
    const l = response[0].formatted_address
    store.history.push(l);

}

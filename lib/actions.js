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
            routeSmallest(latlng)
        }
    };

    if (!store.newFibers) {
        store.newFibers = [];
    }
    store.newFibers.push({
        center: {
            latitude: latlng.lat,
            longitude: latlng.lng
        },
        geometry: []
    })
    _.forEach(store.fibers, removeOldRoutes)
    _.forEach(store.newFibers, removeOldRoutes)
    _.forEach(store.fibers, setIsSelected(maybeRefresh))

    refresh()
}

export function reset() {
    loadDataAsync();
    refresh();
}

function removeOldRoutes(fiber) {
    if (fiber.route) {
        fiber.route = [];
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

        let waypoints = [
            {latLng: L.latLng(store.selectedPosition)},
            {latLng: L.latLng(fiber.center.latitude, fiber.center.longitude)}
        ];
        const newWaypoints = _.map(store.newFibers, function(fiber){
            return {latLng: L.latLng(fiber.center.latitude, fiber.center.longitude)}
        });
        waypoints.push(...newWaypoints);

        router.route(waypoints, function(err, routes) {
            if (err) {
                maybeRefresh();
                return;
            }
            fiber.distance = routes[0].summary.totalDistance;
            setCost(fiber);
            maybeRefresh();
        });
    };
}

function routeSmallest(latlng) {
    var smallest = store.fibers[0];
    _.forEach(store.fibers, function(fiber){
        if (fiber.distance < smallest.distance) {
            smallest = fiber;
        }
    });

    let waypoints = [
        {latLng: L.latLng(latlng)},
        {latLng: L.latLng(smallest.center.latitude, smallest.center.longitude)}
    ];

    /* const newWaypoints = _.map(store.newFibers, function(fiber){
       return {latLng: L.latLng(fiber.center.latitude, fiber.center.longitude)}
       });
       waypoints.push(...newWaypoints);
     */
    smallest.route = L.Routing.control({
        waypoints: waypoints,
        fitSelectedRoutes: false,
        routeWhileDragging: false,
        show: false,
        createMarker: () => null,

        lineOptions: {
            styles: [
                {color: 'orange', opacity: 0.7, weight: 5}
            ]
        }
    });
    smallest.route.addTo(store.map);
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

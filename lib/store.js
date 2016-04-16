// create a store with initial values
let store = {
  center: [40.01, -105.25], // Boulder
  selectedPosition: null,
  fibers: [],
  history: []
}
store.history.push({"lat": 40.01,"lng": -105.25})
// make it a global variable (easy for debugging in the developer's console)
global.store = store

// export it
export default store

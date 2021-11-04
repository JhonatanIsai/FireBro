
import returnFireData from "./make_request.js"
import {initMap } from "./map.js"

// const file = fetch("modis.json")
// .then(response => {
//    return response.json();
// }).then(data => {console.log(data["features"])})

// console.log(file);

let fire = returnFireData();
initMap(fire);

 
// Check if service workers are supprtes
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function (event) {
        navigator.serviceWorker.register('/sw_cached_pages.js')
            .then(registration => console.log("Seriviceworker registrations succefull with scope: ", registration.scope))
            .catch(err => console.log(`Serviceworker: Error: ${err}`))
    })

} 
 
  
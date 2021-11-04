//caching stuff

//The list of files that will be cached
let assets = [
    "/",
    "/index.html",
    "/js/main.js",
    "/js/menus.js",
    // "/js/make_request.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/css/app.css",

    // "/pages/about.html",
    // "/pages/contact.html",
    // "/pages/settings.html",

    "/img/forest.jpg",
    "/img/user.png",
    "/img/bearPictures/smokey-giphy.gif",
    "/img/luke-michael-Tdwu35bCUj0-unsplash.jpg",
   

    "https://fonts.googleapis.com/icon?family=Material+Icons"

];

// When we the install the files in asset will be cached
self.addEventListener('install', function(event){
    console.log('Service Worker: event fired:${event.type}');
    event.waitUntil(
        /** We will open a cache called static and we will 
         *  store all the files from assets in the static cache. 
         */
        caches.open('static').then(function(cache){
            console.log('Service Worker: Precaching App Shell');
            cache.addAll(assets);
        })
    );
});



self.addEventListener("activate", function(event){
    console.log("SW: Event fires: ${event.type}");
});

// 
self.addEventListener("fetch", function(event){
    /*  When the fetch event takes places we will repond with the files we have in the cache
        we will try to match what we are requesting with what we have in the cache.
        If if we have have it in cache we will return it, if we don't have it we will 
        request fetch from the interwebs.
        */
    event.respondWith(caches.match(event.request).then(function(response){
        return response || fetch(event.request);
    })
    );
});  

// ........................................................................................



// const cacheName = "v1";
// const cacheFireData = [];

// self.addEventListener('install', event => { 
//     console.log("Service Worker: Installed.");
    
//     // Waiting until the asynchronus promise is done
//     event.waitUntil(caches.open('static').then(function(cache){
//         console.log("Service worker precaching app shell");
//         cache.addAll('/pages')
//     }))


// });

// self.addEventListener('activate', event => {
//     console.log("Service Worker: Activated.");
//     // Remove old caches
//     event.waitUntil(caches.keys().then(cacheNames => {
//         return Promise.all(
//             cacheNames.map(cache => {
//                 if (cache !== cacheName) {
//                     console.log("Service Worker: Clearing Old cashes");
//                     return caches.delete(cache);
//                 }
//             })
//         );
//     })
//     );

// });

// //

// // We want to check if the live site is available.
// // If not availble check the cached site. 
// //** Use the match method to load from the cahce if the live one fails. 
// //**  */
// self.addEventListener('fetch', event => {
//     console.log("Service Worker: Fetching.");
//     event.respondWith(
//         fetch(event.request).then(response => {
//             // Make cone of the response
//             const responseClone = response.clone();
//             // Open the cache
//             caches.open(cacheName)
//                 .then(cache => {
//             // Add the responseClone to the cache
//                     cache.put(event.request, responseClone);
//                 });
//             // At this point we have cached the response
//             // and we will return the response (the actual site)
//             return response;
//         }).catch(err => caches.match(event.request).then(response => response))
//     );
// })


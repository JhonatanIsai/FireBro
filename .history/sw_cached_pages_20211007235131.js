//caching stuff

const cacheName = "v1";
const cacheAssets =[
    './img',
    './js/main.js',
    './css/materialize.min.css'
];

// /*Installing the service worker*/

self.addEventListener('install', event => {
    console.log("Service Worker: Installed.");

    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log("Servie Wrorker: Caching Files!");
            cache.addAll(cacheAssets);
            
            
        })
        .then(() => self.skipWaiting())
    );

});

self.addEventListener('activate', event=>{
    console.log("Service Worker: Activated.");
    // Remove old caches
    event.waitUntil(caches.keys().then(cache))

})
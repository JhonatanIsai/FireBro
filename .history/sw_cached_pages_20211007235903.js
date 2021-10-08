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

self.addEventListener('activate', event => {
    console.log("Service Worker: Activated.");
    // Remove old caches
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.map(cache => {
                if (cache !== cacheName) {
                    console.log("Service Worker: Clearing Old cashes");
                    return caches.delete(cache);
                }
            })
        );
    })

    );

});

//

// We want to check if the live site is available.
// 
self.addEventListener('fetch', event => {
    console.log("Service Worker: Fetching.")
})
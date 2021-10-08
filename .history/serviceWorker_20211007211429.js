/*Installing the service worker*/


/*Registering the service worker*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            //Successful registration
            console.log("ServiceWorker registration Successfull with scope", registration.scope);

        }, function (err) {
            // Registration Failed
            console.log("ServiceWorker  registration failed:", err);
        });

    });
}


var CACHE_NAME = "fire-bro-cache1";
var urlsToCache = [
    '/',
    '/styles/main.css',
    '/script/main.js'
];

/** Downloading Stuff into cache */

// Wait until all the cache has been downloaded
// Keep the file list small to minimize chance of failure
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // cache hit -- return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit -return response
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    function (response) {
                        // Check if we receive a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // 
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', function(event){
    var cacheAllowList =['pages-cache-v1', 'blog-posts-cache-v1'];

    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if (cacheAllowList.indexOf(cacheName === -1){
                        return caches.delete
                    })
                })
            );
        })
    );


})






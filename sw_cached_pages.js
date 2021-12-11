//caching stuff

// cache names
let static = "static_cache_v1";
let dynamic = "dynamic_cache_v1";

//The list of files that will be cached
let dynamic_pages = [
    // Pages
    "/",
    "/index.html",
    "/pages/fallBack.html",
    "/pages/about.html",
    "/pages/contact.html",

 
    // JavaScript

    "/js/materialize.min.js",
    "/js/menus.js",
    "/css/materialize.min.css",
    "/css/app.css",

    // Images 
    "/img/forest.jpg",
    "/img/user.jpg",
    "/img/bearPictures/smokey-giphy.gif",
    "/img/flag.jpg",
    "/img/bear.jpg",

    // from web
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v114/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    // "https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?status=open"

];

// When we the install the files in asset will be cached
self.addEventListener('install', event => {
    event.waitUntil(
    /** We will open a cache called static and we will 
     *  store all the files from assets in the static cache. 
     */
      caches.open(static)

        .then(cache => cache.addAll(dynamic_pages))
        .then(self.skipWaiting())
    );
  });
  
// Cache versioning 

// We will get rid of old caches on the activate part of the Service Worker

/** We will look into the caches and look at all the keys
 *  We will filter through the caches array and if  any key
 * is not the same as the name name of our static cache we WONT filter it out,
 * and delete everything that is not the right static_cache_name
              */
  self.addEventListener('activate', event => {
    const currentCaches = [static, dynamic];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      }).then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      }).then(() => self.clients.claim())
    );
  });
  

//Fires every times there is a fetch event listener 
/*  When the fetch event takes places we will repond with the files we have in the cache
    we will try to match what we are requesting with what we have in the cache.
    If if we have have it in cache we will return it, if we don't have it we will 
    request fetch from the interwebs.
    */


  self.addEventListener('fetch', event => {

    if (event.request.url.startsWith(self.location.origin)) {
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
  
          return caches.open(dynamic).then(cache => {
            return fetch(event.request).then(response => {
              // Put a copy of the response in the runtime cache.
              return cache.put(event.request, response.clone()).then(() => {
                return response;
              });
            });
          });
        })
      );
    }
  });




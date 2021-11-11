//caching stuff

// cache names
let static_cache_name = "static_cache_v1";
let dynamic_cache_name = "dynamic_cache_v1";

//The list of files that will be cached
let assets = [
    // Pages
    "/",
    "/index.html",
    "/pages/fallBack.html",
    "/pages/about.html",
    "/pages/contact.html",


    // JavaScript
    "/js/main.js",
    "/js/menus.js",
    "/js/materialize.min.js",

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

];

// When we the install the files in asset will be cached
self.addEventListener('install', function (event) {
    // console.log('Service Worker: event fired:${event.type}');
    event.waitUntil(
        /** We will open a cache called static and we will 
         *  store all the files from assets in the static cache. 
         */
        caches.open(static_cache_name).then(function (cache) {
            console.log('Pre Caching shell Assets...');
            cache.addAll(assets);
            console.log("Pre Caching assets comlete!")
        })
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
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== static_cache_name && key !== dynamic_cache_name)
                .map(key => caches.delete(key))
            )
        })
    );
});

//Fires every times there is a fetch event listener
/*  When the fetch event takes places we will repond with the files we have in the cache
    we will try to match what we are requesting with what we have in the cache.
    If if we have have it in cache we will return it, if we don't have it we will 
    request fetch from the interwebs.
    */
self.addEventListener("fetch", event => {
    // console.log("Fething", event);
    event.respondWith(
        caches.match(event.request).then(cachesRespond => {
            return cachesRespond || fetch(event.request).then(newRequest => {
                return caches.open(dynamic_cache_name).then(cache => {
                    cache.put(event.request.url, newRequest.clone());
                    return (newRequest);
                })



                // if (event.request.url.indexOf("js/main.js") <= -1) {
                //     // if (event.request.url.indexOf("js/menus.js") <= -1 ){

                //         console.log("main", event.request.url.indexOf("js/main.js"));
                //         console.log("menu", event.request.url.indexOf("js/menus.js"));
                //         console.log("found bad URL", event.request.url);
                //         return caches.open(dynamic_cache_name).then(cache => {
                //             cache.put(event.request.url, newRequest.clone());
                //             return (newRequest);
                //         })

                //     // }

                // }

            }
            )
        }).catch(() => {
           return  caches.match("./pages/fallBack.html");
        })
    )
});




// })



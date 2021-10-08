/*Installing the service worker*/


/*Registering the service worker*/ 
if('serviceWorker' in navigator)
{
    window.addEventListener('load', function()
    {
        navigator.serviceWorker.register('/sw.js').then(function(registration)
        {
            //Successful registration
            console.log("ServiceWorker registration Successfull with scope", registration.scope);

        }, function(err){
            // Registration Failed
            console.log("ServiceWorker  registration failed:", err);
        });
        
    });
}


var CACHE_NAME ="fire-bro-cache1";
var urlsToCache =[
    '/',
    '/styles/main.css',
    '/script/main.js'
];

/** Downloading  */

// Wait until all the cache has been downloaded
// Keep the file list small to minimize chance of failure
self.addEventListener('install',function(event){
    event.waitUntil(caches.open(CACHE_NAME)     
    .then(function(cache){
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});



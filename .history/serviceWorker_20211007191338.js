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
    ''
]


self.addEventListener('install',function(event){
    
})


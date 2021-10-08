/*Installing the service worker*/


/*Registering the service worker*/ 
if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/sw.js').then(function(registration)){
            //Successful registration
            console.log("ServiceWorker registration Successfull with scope", registration.s);

        }
    })
}

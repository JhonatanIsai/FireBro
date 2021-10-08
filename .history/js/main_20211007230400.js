// Check if service workers are supprtes


if ('serviceWorker' in navigator){
    window.addEventListener('load', function(event){
        navigator.serviceWorker.register('../sw_cached_pages.js')
        .then(regis
            console.log("Seriviceworker registrations succefull with scope: ", registration.scope);
        )
    })
    console.log('Service Worker supported.');
}
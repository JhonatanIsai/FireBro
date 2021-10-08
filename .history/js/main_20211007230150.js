// Check if service workers are supprtes


if ('serviceWorker' in navigator){
    window.addEventListener('load', function(event){
        navigator.serviceWorker.register('../sw_cached_pages.js')
        .then(function(registration){
            console.log
        })
    })
    console.log('Service Worker supported.');
}
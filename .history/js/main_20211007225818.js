// Check if service workers are supprtes


if ('serviceWorker' in navigator){
    window.addEventListener('load', function(event){
        navigator.serviceWorker.register('../sw-cached_')
    })
    console.log('Service Worker supported.');
}
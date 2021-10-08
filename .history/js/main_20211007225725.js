// Check if service workers are supprtes


if ('serviceWorker' in navigator){
    window.addEventListener('load', function(ev))
    console.log('Service Worker supported.');
}
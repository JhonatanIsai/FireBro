// Check if service workers are supprtes


if ('serviceWorker' in navigator){
    window.addEventListener('load')
    console.log('Service Worker supported.');
}
/**
 * Author JhonatanMedina
 * Fire Bro
*/

/** This file handles the request for the Openweather API and makes chages to the HTML.
 * 1. Ask for location permission, with the built in navigator geolocation.
 * 2. If permission is given a request for OpenWeatherAPI is made. 
 * 3. Data from request is processed into JSON and passed to addDataToDOM
 * 4. HTML elements will be accessed by ID and information pulled from api will
 *      be added to the elements for display.
 */

//.................................................................................................

/** Data from the API request is passed to function and and the DOm elements are accesed. 
 *  API data is passed to the elements to diplay in UI. 
 *  For the weather Icon we are going to attempt to retrieve the image from Web,
 *      if the image fails to be retrieved, the app logo will displayed in its place. 
 */
function addDataToDOM(data) {
    // Code for the Icon ID
    var weatherIconCode = data.weather[0].icon;

    //Accessing the DOM elements 
    var currentCityName = document.getElementById("cityName");
    var currentTemperature = document.getElementById("temperature");
    var currentWeather = document.getElementById("weather");
    var currentWeatherIcon = document.getElementById("weatherIcon");

    //Changing the data inside the elements
    currentTemperature.innerText = data.main.temp + " F";
    currentCityName.innerText = data.name;
    currentWeather.innerText = data.weather[0].main;

    // Try to load the icon for the weather
    // If it fails, load the default image.
    try{
        currentWeatherIcon.src= "http://openweathermap.org/img/wn/"+weatherIconCode+"@2x.png";
    }
    catch{
        currentWeatherIcon.src= "/img/icon/icons8-fire-96.png";
    }
}

/** The application will request permission to use location services. 
 *  will use navigator geolocation to get the coordinates of the user current location.
 * The result of the coordinates will passed to showLocation().
 */
function getLocation() {
    // Getting geolocation permission
    if (navigator.geolocation) {
        console.log("Getting location ...");
        navigator.geolocation.getCurrentPosition(showLocation);
    } else {    
        //It failed
        console.log("Geolocation not supported");
    }
};

/** When the postion data is received it is split into latitude and longitude.
 *  The longitude and latitude are passed into the URL for the request, the API Key also
 *  needs to be passed and it will imported from  adifferent pace. 
 *  After getting response from API, it is converted to JSON and the data is than passed to the 
 *  addDataToDOM().
 */
function showLocation(position) {
    // console.log(position.coords)
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    const key = 'f5a76bcde0f4fed7682b28cd60f2f9b1';
    var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key + '&units=imperial';

    fetch(weatherURL) // converting request to JSON
        .then(response => response.json())
        .then(weatherData => {
            addDataToDOM(weatherData);
        })
}
// api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={f5a76bcde0f4fed7682b28cd60f2f9b1}

getLocation();


//"sw_cached_pages.js",
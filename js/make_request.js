// Funtions to deal with the API requests

// Holds events for fires
let fireEvents = [];

// Fetching wildfire data from EONET
async function getNasaData() {
    let allEvents =[];
    // const response = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v3/categories/wildfires?status=open');
    const response = await fetch('./wildfires.json')
    const responseInJSON = await response.json()
    .then(token => {
        allEvents = token.events
        // console.log(allEvents)
        return allEvents
    })
    return responseInJSON
}


export default function returnFireData(){
    return getNasaData();
    // return processFireData();
}


// 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events'
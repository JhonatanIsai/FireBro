// Funtions to deal with the API requests

// Holds events for fires
let fireEvents = [];

// Fetching wildfire data from EONET
const getNasaData = async () => {
    const response = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v3/categories/wildfires?status=open');
    const responseInJSON = await response.json();
    return responseInJSON;
};

export const processFireData = async () => {
    const fireData = await getNasaData();
    fireEvents = fireData['events'];
    fireEvents.forEach(fire => console.log(fire));
};



// 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events'
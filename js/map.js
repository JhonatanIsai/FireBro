// import { addNewFire } from "../src";
// import {test3 } from "../src/index.js";

/**
 * 1. this will start the map and the point of focus.
 * 2. The function will receieve an promize object with the fire data
 * 3. Function addAllFires will loopd through every fire obj and retrieve the name for the fires
 * 4. The coordinates will be used to set the marker, name will be used to set the name
 *      and the date item will be used toset the the time that the fire started. **/


 export function initMap() {
    // Starting map and setting the point of foucs. 
    // Point of focus will be set the geographical center of the united states
    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.82798336591934, lng: -98.57838535879146 },
        zoom: 3.8
    });


    // WIll loop through all the objects of fires containing data.
    
    let test = fetch("https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?status=open")
        .then(data => data.json())
        .then(jsonData => jsonData.events)
        .then(result => {
            // console.log(result)
            result.forEach(element => {
                let lat = element.geometry[0].coordinates[0];
                let lng = element.geometry[0].coordinates[1];
                let name = element.title.split("-");
                let startTime = element.geometry[0].date.split("-");
                let dayAndTime = startTime[2].split("T");
                let fireID = element.id;

                // Formats the time
                let date = dayAndTime[0] + "-" + startTime[1] + "-" + startTime[0];

                //Keeps the names from being Wildfire since thatis a bit obvious
                //Some Fires Have just a name and some of them have the complete location of
                //where the fire took place
                if (!['Wildfire ', 'Wildfire MB', 'Wildfires', 'Wildfires '].includes(name[0])) {
                    name = name[0];

                }
                else {
                    name = name[1];
                }

                // console.log(startTime);
                addMarker({ location: { lat: lng, lng: lat }, name, date,fireID });
                // fireEventListener(fireID);

            }); 
            

        })
    /*  Will make a information window for each fire obj above
     *  Will use image of a flame and set the name for the fire.
     *  Will display some information reguarding the fire.
    */
    function addMarker(property) { 

        const marker = new google.maps.Marker({
            position: property.location,
            map: map,
            icon: "/img/icon/icons8-fire-48.png",
            title: "ONE",
        });

        const detailWindow = new google.maps.InfoWindow({
            
            content: "<h4>" + property.name + "</h4>"+
            "<button id='"+property.fireID+"' name='"+property.name+"' onclick='test3("+property.fireID+")' class='btn red darken-2 z-depth-0'>Add</button>",
        
        
        });

        marker.addListener("click", () => {
            detailWindow.open(map, marker);
        });
    
    };
};

// ' onclick='test3("+property.fireID+")'




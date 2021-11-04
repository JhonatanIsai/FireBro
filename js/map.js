// import {processFireData} from "make_request";


//  historical fire data
// https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_FireOccurrence_01/MapServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json

 
export function initMap(data){

    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.82798336591934, lng: -98.57838535879146 },
        zoom: 3.8
    });

    let addAllNewFires = data.then(result => {
        result.forEach(element => {
            let lat = element.geometry[0].coordinates[0];
            let lng = element.geometry[0].coordinates[1];
            let name = element.title.split("-");
            let startTime = element.geometry[0].date.split("-");
            let dayAndTime= startTime[2].split("T");

            // Formats the time
            let date = dayAndTime[0] +"-"+ startTime[1] + "-" + startTime[0];

            //Keeps the names from being Wildfire since thatis a bit obvious
            if (!['Wildfire ', 'Wildfire MB', 'Wildfires', 'Wildfires ' ].includes(name[0])){
                name = name[0];
                // console.log(name);
            }
            else{
                name = name[1];
                // console.log(name)
            }
        
            // console.log(startTime);
            addMarker({location:{ lat: lng, lng: lat}, name, date}); 
            
        });
    });


    function addMarker(property){
        const marker = new google.maps.Marker({
        position:property.location,
        map:map,
        icon: "/img/icon/icons8-fire-48.png",
        title: "ONE",
        });

        const detailWindow = new google.maps.InfoWindow({
            content: "<h4>" + property.name + "</h4>",
        });

        marker.addListener("click", () =>{
            detailWindow.open(map,marker);
        })

    }
};


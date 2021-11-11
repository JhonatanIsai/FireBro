
function fireOptionMenu(){
    const yearoption = document.getElementById('fireMenuOptions');
    
    for(let i=0;i<10;i++){
        var yearToAdd = document.createElement('option');
        yearToAdd.text = i;
        // yearoption.add(yearToAdd,yearoption[0]);

        
    }
}

fireOptionMenu();
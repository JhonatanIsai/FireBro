

import {enableIndexedDbPersistence,  getFirestore, doc, getDoc, getDocs, collection, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// import { ConcatenationScope } from "webpack";
import { db, fireCollectionRef } from "../js/dataBase/fireBase-config.js";
// import { } from "firebase/firestore";



enableIndexedDbPersistence(db)
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            
            console.log("Persistance Failed.");
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
            console.log("Persistance is not valid.");
        }
    });



//...................Get Fires from watch list DB..................
const getFires = async () => {
    var dataArray = [];

    const data = await getDocs(fireCollectionRef);
    const secondData = data.docs.map((doc) => {
    
        dataArray.push([doc.data().Name, doc.data().ID, doc.id])

    })
    // console.log(name);
    return dataArray;
}
getFires().then(data => {
    data.map(x => displayFireList(x))
    // console.log(data)
});
//.................... Delete From BD ....................................

const deleteUser = async (id) => {
    const userDoc = doc(db, "FiresDB", id);
    await deleteDoc(userDoc);
    console.log("user deleted");

}
//.................... Adding new Fire To DB ....................................

function addNewFire() {
    const inputForm = document.getElementById("rightMenuForm").elements;

    const name = inputForm.item(0).value;
    const ID = inputForm.item(1).value;

    // const name = dataArray[0];
    // const ID = dataArray[0] | "nn";

    if (Boolean(ID) && Boolean(name)) {

        const addNewUser = async (name, ID) => {
            await addDoc(fireCollectionRef, { Name: name, ID: ID })
            console.log("adding user");
        }
        addNewUser(name, ID);
    }
    else {
        //If the fields are empty we add a toast and display message to terminal.
        console.log("Empty fields on right menu.");

        M.toast({
            html: 'Name and ID fields are empty',
            classes: "rounded"
        });
    }
}
















document.getElementById("submitFireButton").addEventListener("click", addNewFire, false);



//........................................................................
function displayFireList(fireNameFromBD) {

    const watchFireDiv = document.createElement("div");
    watchFireDiv.classList.add("watchListItem");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.id = "fireTest";
    deleteButton.classList.add("waves-effect", "waves-light", "btn-small", "red");

    deleteButton.onclick = () => {
        deleteUser(fireNameFromBD[2])
    }





    const updateButton = document.createElement("button");
    updateButton.innerHTML = "Update";
    updateButton.classList.add("waves-effect", "waves-light", "btn-small", "blue");


    const name = document.createElement("p");
    const fireName = document.createTextNode(fireNameFromBD[1] + " " + fireNameFromBD[0]);

    // Add String to <p> name tag
    name.appendChild(fireName);
    // Add <p> name tag to parent <div>
    watchFireDiv.appendChild(name)

    // Add Delete Button to <div>

    const parentDiv = document.getElementById("fireToWatchResults");
    parentDiv.appendChild(watchFireDiv);
    parentDiv.appendChild(deleteButton);
    parentDiv.appendChild(updateButton);







    // const update = async (priority, id) => {
    //     const userDoc =doc(db, "users", id);
    //     const newPriority = {priority:1}
    //     await updateDoc(userDoc, newFields);
    // }
}

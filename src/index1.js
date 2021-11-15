import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection,addDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// import { functionsIn } from "lodash";
// Import the functions you need from the SDKs you need





// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

apiKey: "AIzaSyDbwrVecvJW8oa-u8puA6xiRcxQhgEZ5Fg",

authDomain: "firebro-331021.firebaseapp.com",

projectId: "firebro-331021",

storageBucket: "firebro-331021.appspot.com",

messagingSenderId: "476059468337",

appId: "1:476059468337:web:458d80ad6eaeb9ad468b10",

measurementId: "G-ZZT21BE6DE"

};

const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
const db = getFirestore(app);
//..............................................................................
const userCollectionRef = collection(db, "users");



//..........................................................
const getUsers = async () =>{
var name ;
const data = await getDocs(userCollectionRef);
const secondData = data.docs.map((doc) => {
    name = doc.data().name});
// console.log(name)
return name;
}
getUsers().then(data => 0)


//........................................................

    const addNewUser = async () =>{
        await addDoc(userCollectionRef, {name:"kevin", age:"22"})
        console.log("adding user");
    }

//........................................................................

const update = async (priority, id) => {
    const userDoc =doc(db, "users", id);
    const newPriority = {priority:1}
    await updateDoc(userDoc, newFields);
}

const deleteUser = async (id) => {
    const userDoc =doc(db, "users", id);
    await deleteDoc(userDoc);

}



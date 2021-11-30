import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection,addDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

/** Fire Base credentials for connection
 *  This are the4 FireBase credentials to succesfully connect
 * Exporting App to use for other FireBase services
 * Exporting db to connect with firestore
 * Exporting the Database that we actually want from FireStore
 */

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Credentials needed to connect, dont make any changes
const firebaseConfig = {

apiKey: "AIzaSyDbwrVecvJW8oa-u8puA6xiRcxQhgEZ5Fg",

authDomain: "firebro-331021.firebaseapp.com",

projectId: "firebro-331021",

storageBucket: "firebro-331021.appspot.com",

messagingSenderId: "476059468337",

appId: "1:476059468337:web:458d80ad6eaeb9ad468b10",

measurementId: "G-ZZT21BE6DE"

};

// For use with outher firebase services
export const app = initializeApp(firebaseConfig);

// To connect to firestore
export const db = getFirestore(app);
//..............................................................................
// To choose the correct db base from the firestore
export  const fireCollectionRef = collection(db, "FiresDB");

import { initializeApp } from 'firebase/app';
import { getFirestore, doc } from 'firebase/firestore';

import {getAuth} from 'firebase/auth';


const firebaseApp = initializeApp({

});

const auth =getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

import { app, db, fireCollectionRef } from "../dataBase/fireBase-config.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,

    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";



// Connecting Authentication to FireBase
const auth = getAuth(app);

// .................Sing Up New User.................
const signupForms = document.getElementById("signup-form");

signupForms.addEventListener("submit", (event) => {
    event.preventDefault();

    // Pulling identification credentials. 
    const email = signupForms["signup-email"].value;
    const password = signupForms["signup-password"].value;

    // Creating the new user with FireBase
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const email = userCredentials.user.email;
            document.getElementById("userEmail").innerHTML = email;
            const modal = document.getElementById("modal-signup");
            M.Modal.getInstance(modal).close();
            signupForms.reset();

                // Toast
                M.toast({html:"New User Signup"});

        }).catch((error) => {
            // Incase of failure display why
            console.log(error.code);
            console.log(error.message);
        })
});

// ................. Login User.................

// Aceesing sign in form
const loginForms = document.getElementById("login-form");

loginForms.addEventListener("submit", (event) => {
    event.preventDefault();

    // Getting credentials from user
    const email = loginForms["login-email"].value;
    const password = loginForms["login-password"].value;

    // Sign in with FireBase
    // 
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            // Actions for a succesful login
            // A toast will confirm the login

            const email = userCredentials.user.email;

            document.getElementById("userEmail").innerHTML = email;
            const modal = document.getElementById("modal-login");
            M.Modal.getInstance(modal).close();
            signupForms.reset();

            // Toast
            M.toast({html:"User Signed-In"});
            return(userCredentials.user.email)
        })
        // .then(email => console.log(email))
        .catch((error) => {
            // Incase of failure display why
            console.log(error.code);
            console.log(error.message);
        });
});

// ................. Logout User.................

const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", (event) =>{
    event.preventDefault();
    signOut(auth).then(() => {
        console.log("User Signed-Out");
        document.getElementById("userEmail").innerHTML = "Log-In";
        //User Sign-Out Toast 
        M.toast({html:"User Signed-Out"});

    }).catch((error) =>{
        console.log(error.code);
        console.log(error.message);
    });
});




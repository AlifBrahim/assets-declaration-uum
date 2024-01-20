// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 export const firebaseConfig = {
    apiKey: "AIzaSyAaiE-rPIvfCw2XsBkzQrpXW7AchI308m0",
    authDomain: "assets-declaration-uum.firebaseapp.com",
    projectId: "assets-declaration-uum",
    storageBucket: "assets-declaration-uum.appspot.com",
    messagingSenderId: "406138804168",
    appId: "1:406138804168:web:5a0db46b302d3311c612fd",
    measurementId: "G-GRT8FWX1E9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

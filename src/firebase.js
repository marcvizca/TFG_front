// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmt22gHMpNkEPxRGRoYFSR-JsuitNE_ek",
  authDomain: "tfg2023-9c973.firebaseapp.com",
  projectId: "tfg2023-9c973",
  storageBucket: "tfg2023-9c973.appspot.com",
  messagingSenderId: "64880460700",
  appId: "1:64880460700:web:172f6e262ff6c5b1943e59",
  measurementId: "G-Z14GWBCSFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
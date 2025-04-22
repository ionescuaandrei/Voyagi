// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1LCfwalWy44cVinAoCCYWE2tX4owASVA",
  authDomain: "voyagi-3e386.firebaseapp.com",
  projectId: "voyagi-3e386",
  storageBucket: "voyagi-3e386.firebasestorage.app",
  messagingSenderId: "595275012778",
  appId: "1:595275012778:web:b0b849b4156cec94944ed3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
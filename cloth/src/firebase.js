// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrPhEcha28bQKaos37d0X2znlHcm3WKTc",
  authDomain: "cloth-a6bcb.firebaseapp.com",
  projectId: "cloth-a6bcb",
  storageBucket: "cloth-a6bcb.firebasestorage.app",
  messagingSenderId: "954404952630",
  appId: "1:954404952630:web:c6967db44eee57e6089697",
  measurementId: "G-1BCJRGHKZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export {app}   
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATcnCUSr54gMPfo7r_O72oF7FuPlXSueI",
  authDomain: "calculate-expenses.firebaseapp.com",
  projectId: "calculate-expenses",
  storageBucket: "calculate-expenses.appspot.com",
  messagingSenderId: "812217786199",
  appId: "1:812217786199:web:6023bd444e7a9e14d1a812",
  measurementId: "G-QQGHX4BJ08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let analytics;
if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const firebaseConfigData = {
  db,
  text: 'hello'
}

export default firebaseConfigData;
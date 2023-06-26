// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASF5aTicyg29OFkeaLH3Du5drY9rYLBtw",
  authDomain: "rnonewsapp.firebaseapp.com",
  projectId: "rnonewsapp",
  storageBucket: "rnonewsapp.appspot.com",
  messagingSenderId: "913747140463",
  appId: "1:913747140463:web:30608d5508463e4a46529a",
  measurementId: "G-W8DV6PZV2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
export default app;
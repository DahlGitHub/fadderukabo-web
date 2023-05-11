// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbZCyD3KZLyXK8HaIfefHMDzASWjFLNmU",
  authDomain: "fadderukabo.firebaseapp.com",
  databaseURL: "https://fadderukabo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fadderukabo",
  storageBucket: "fadderukabo.appspot.com",
  messagingSenderId: "529943940527",
  appId: "1:529943940527:web:6328b26e2dc836d1f4335a",
  measurementId: "G-NPC2RCX0WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
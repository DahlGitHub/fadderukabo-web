// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export {auth, db, app, database, storage, analytics}



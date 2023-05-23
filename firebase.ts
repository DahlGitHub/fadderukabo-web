// Import the functions you need from the SDKs you need
import{ GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail, signOut, User} from "firebase/auth";
import {getFirestore, query, getDocs,collection,where,addDoc, doc, setDoc, updateDoc, DocumentReference} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
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

  return initializeApp(firebaseConfig);
  }
}

// Initialize Firebase
const app = initializeAppIfNecessary();

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const microsoftProvider = new firebase.auth.OAuthProvider("microsoft.com");
microsoftProvider.setCustomParameters({
  prompt: "consent",
  tenant: "52c4340a-af1c-4010-b7e4-08e63d51696f"
})




const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    // log out the user if an error occurs
    auth.signOut();
  }
};



const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {

    }
};

export const getSessionToken = async (user: User): Promise<string | null> => {
  const authorizedEmailsRef = collection(db, 'allowedEmails');
  const authorizedEmailsQuery = query(authorizedEmailsRef, where('email', '==', user.email));

  const querySnapshot = await getDocs(authorizedEmailsQuery);
  if (!querySnapshot.empty) {
    const sessionToken = user.uid;
    const userDocRef = querySnapshot.docs[0].ref;
    await updateDoc(userDocRef, { sessionToken });

    return sessionToken;
  }

  return null;
};


const logout = () => {
  signOut(auth);
};

export {auth, db, logInWithEmailAndPassword, signInWithGoogle, logout, app, database, storage}



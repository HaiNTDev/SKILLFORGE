// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI9dvZ0MtXgfsIdA4ZthuJyBEQ4gE8YPY",
  authDomain: "liquid-fort-412406.firebaseapp.com",
  projectId: "liquid-fort-412406",
  storageBucket: "liquid-fort-412406.appspot.com",
  messagingSenderId: "266199286737",
  appId: "1:266199286737:web:60555b59340e4ad34356f0",
  measurementId: "G-P0BF2JBZR4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage();

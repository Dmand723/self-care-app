// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import exp from "constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

  authDomain: "selfcareapp-a5c83.firebaseapp.com",

  projectId: "selfcareapp-a5c83",

  storageBucket: "selfcareapp-a5c83.firebasestorage.app",

  messagingSenderId: "174100429646",

  appId: "1:174100429646:web:f87fc2aca71e089619fc1f",

  measurementId: "G-9F6Y6HDXZ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

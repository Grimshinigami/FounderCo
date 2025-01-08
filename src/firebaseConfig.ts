// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYYlbtgxPQyQb7H8jfaGQV4-wmB5rl7ME",
  authDomain: "founderco-e1e89.firebaseapp.com",
  projectId: "founderco-e1e89",
  storageBucket: "founderco-e1e89.firebasestorage.app",
  messagingSenderId: "637605569492",
  appId: "1:637605569492:web:09e6973e9382c7094aac41",
  measurementId: "G-2ND021CN81"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
export const firebaseDb = getFirestore(app);
export const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";

import {getAuth} from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvQEoVeFP1oMIR0IB04Rf2im5X2m3R-5Y",
  authDomain: "whatsapp-clone-bd320.firebaseapp.com",
  projectId: "whatsapp-clone-bd320",
  storageBucket: "whatsapp-clone-bd320.appspot.com",
  messagingSenderId: "153273803599",
  appId: "1:153273803599:web:f7ba7d4ec71b61be7d1b3a",
  measurementId: "G-RFX989MTMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);


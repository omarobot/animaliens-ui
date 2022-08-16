// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv7sRZuUDmfIuUu7B-xe2acz__qEk0gxs",
  authDomain: "animaliens-2e447.firebaseapp.com",
  projectId: "animaliens-2e447",
  storageBucket: "animaliens-2e447.appspot.com",
  messagingSenderId: "1047439715858",
  appId: "1:1047439715858:web:03c643c99fc87d1a0272cb",
  measurementId: "G-S9RQ7LBP4N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
export const db = getFirestore(app);

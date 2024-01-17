// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi6jKJ1EbeeclxQX_jD5L6nDLPT6mD8tA",
  authDomain: "shopmanagementsystem-4579a.firebaseapp.com",
  projectId: "shopmanagementsystem-4579a",
  storageBucket: "shopmanagementsystem-4579a.appspot.com",
  messagingSenderId: "611264290271",
  appId: "1:611264290271:web:98c722a5b86356d6ab386a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app);

export const db = getFirestore(app);

console.log(db);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjULDKBJs0x2iBVuCGzag_QU9H2C5_LRQ",
  authDomain: "snapchef-c84f1.firebaseapp.com",
  projectId: "snapchef-c84f1",
  storageBucket: "snapchef-c84f1.appspot.com",
  messagingSenderId: "135460402622",
  appId: "1:135460402622:web:ec5c1bced97076af5875ef"
};

// Initialize Firebase
useEffect(()=>{
  initializeApp(firebaseConfig);
},[])



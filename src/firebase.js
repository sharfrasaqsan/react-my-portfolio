import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAD_NmGZfOTh67jtz3RV3US2zMEIg7KC8M",
  authDomain: "react-my-portfolio-3d6fd.firebaseapp.com",
  projectId: "react-my-portfolio-3d6fd",
  storageBucket: "react-my-portfolio-3d6fd.firebasestorage.app",
  messagingSenderId: "905050505507",
  appId: "1:905050505507:web:a49ed3da4ff22c4cfb8c96",
  measurementId: "G-X06QLGYMCX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
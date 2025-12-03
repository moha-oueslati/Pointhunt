import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrZ552taZ6UlauHbWCKv3mWkkWkY49SRg",
  authDomain: "pointhunt-b8ae6.firebaseapp.com",
  projectId: "pointhunt-b8ae6",
  storageBucket: "pointhunt-b8ae6.firebasestorage.app",
  messagingSenderId: "234093327874",
  appId: "1:234093327874:web:c0cbe1d7de173a7a6dd91b",
  measurementId: "G-TKSTGF4GLN"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

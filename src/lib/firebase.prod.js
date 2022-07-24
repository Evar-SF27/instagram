import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { seedDatabase } from "../seed";

const firebaseConfig = {
  apiKey: "AIzaSyBR4cTng9PvSb99DyPl-PH_sZCKlxTLamg",
  authDomain: "instagram-clone-4c94f.firebaseapp.com",
  projectId: "instagram-clone-4c94f",
  storageBucket: "instagram-clone-4c94f.appspot.com",
  messagingSenderId: "605539493308",
  appId: "1:605539493308:web:6787db1bdd7be17b28b7b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

// seedDatabase()

export { db, auth }
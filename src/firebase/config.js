import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_bqQvRhZS_6SZjkQ4RskLPHi3XD4QiLQ",
  authDomain: "dojosite-671d5.firebaseapp.com",
  projectId: "dojosite-671d5",
  storageBucket: "dojosite-671d5.appspot.com",
  messagingSenderId: "402769851143",
  appId: "1:402769851143:web:8d2cd0602b8394e8b24ba2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const timestamp = Timestamp;
const storage = getStorage(app);
export { auth, db, timestamp, storage };

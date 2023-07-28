// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtHNlUzo9mWQCw3ANWKf3K1hB0vMQHOy8",
  authDomain: "travel-blog-40ee6.firebaseapp.com",
  projectId: "travel-blog-40ee6",
  storageBucket: "travel-blog-40ee6.appspot.com",
  messagingSenderId: "447230815502",
  appId: "1:447230815502:web:74691a0eb0d3a2b679bb5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize and export Firestore and get a reference to the service
export const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);

// Initialize and export Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
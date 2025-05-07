import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr6pSac7RCfOYu4eCyfBZDWeDAxAiCrzA",
  authDomain: "game-recharge-store.firebaseapp.com",
  projectId: "game-recharge-store",
  storageBucket: "game-recharge-store.firebasestorage.app",
  messagingSenderId: "515781944019",
  appId: "1:515781944019:web:6569fcc90eb407fcebea26",
  measurementId: "G-XCKQ5E2FZQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

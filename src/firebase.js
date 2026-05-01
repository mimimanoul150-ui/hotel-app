import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCPuFc9SJ9TxfF3ANZ8MrdtWdmO4yHbyIE",
  authDomain: "hotel-app-c83b5.firebaseapp.com",
  projectId: "hotel-app-c83b5",
  storageBucket: "hotel-app-c83b5.firebasestorage.app",
  messagingSenderId: "193262342642",
  appId: "1:193262342642:web:35703be0f8306d530fdb6b",
  measurementId: "G-K45K38Y76Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
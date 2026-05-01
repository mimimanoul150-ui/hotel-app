import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import hotels from "./hotels.json" assert { type: "json" }

const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJECT.firebaseapp.com",
  projectId: "TON_PROJECT_ID"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function upload() {
  for (const hotel of hotels) {
    await addDoc(collection(db, "hotels"), hotel)
  }
  console.log("✅ Upload terminé")
}

upload()

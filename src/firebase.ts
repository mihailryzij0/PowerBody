import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc } from "firebase/firestore";
import { enableIndexedDbPersistence } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBecqwV8Ij8Fep_E03F-5oDgLMQCglfgCQ",
  authDomain: "powerbody-6330f.firebaseapp.com",
  projectId: "powerbody-6330f",
  storageBucket: "powerbody-6330f.appspot.com",
  messagingSenderId: "25674943814",
  appId: "1:25674943814:web:1335da2f6dca624c4ae947",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
enableIndexedDbPersistence(db);
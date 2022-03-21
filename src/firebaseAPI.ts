import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getFirestore, query, setDoc, where } from "firebase/firestore";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBecqwV8Ij8Fep_E03F-5oDgLMQCglfgCQ",
  authDomain: "powerbody-6330f.firebaseapp.com",
  projectId: "powerbody-6330f",
  storageBucket: "powerbody-6330f.appspot.com",
  messagingSenderId: "25674943814",
  appId: "1:25674943814:web:1335da2f6dca624c4ae947",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export async function getColectionFirebase(
  colectionName: string,
  documentName: string
) {
  const querySnapshot = await getDoc(doc(db, colectionName, documentName));
  return querySnapshot.data();
}

export async function getFirebaseImg() {
  const storage = getStorage();
  const gsReference = sRef(
    storage,
    "gs://powerbody-6330f.appspot.com/image/fon.jpg"
  );
  let f = await getDownloadURL(gsReference);
  return f;
}

// export async function getElementFirebase(postId:string) {
//   const db = getDatabase();
// const starCountRef = ref(db, 'AllWorkout/' + 'postWorkouts'  + `/${postId}`);
//  onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data)
// });

// }

export async function setItemFirebase(data: object, documentName: string) {
  const cityRef = doc(db, "AllWorkout", `${documentName}`);
  setDoc(cityRef, { data });
}

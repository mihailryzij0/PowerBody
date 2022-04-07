/**
 * @jest-environment node
 */
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
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
// enableIndexedDbPersistence(db);
export const getFirebaseData = (colection:string, document:string)=>
      getDoc(doc(db, colection, document)).then(data => {    
         if(data.exists()){
          console.log(data.data())
          return data.data()
         }else{
          throw "Несчастливое число";
         }
    })


export const setFirebaseData = 
async (colection:string, document:string, data:Record<string, string>)=>{
  setDoc(doc(db, `${colection}`, `${document}`),data)
}

export const signIn = (email:string, pass:string)=>
        signInWithEmailAndPassword(getAuth(), email, pass)
        .then(({ user }) => {
          const userData = {
            email: user.email,
            idUser: user.uid,
            token: user.refreshToken,
            isAuth: true,
          };
          return userData;
        })

export  const signUp = (email:string, pass:string)=>
         createUserWithEmailAndPassword(getAuth(), email, pass)
        .then(({ user }) => {
          const userData = {
            email: user.email,
            idUser: user.uid,
            token: user.refreshToken,
            isAuth: true,
          };
          setDoc(doc(db, "users", `${user.email}`), {
            isAdmin: false,
            workout: null,
          });
          return userData;
        })
     
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  enableIndexedDbPersistence,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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
const storage = getStorage();
// enableIndexedDbPersistence(db);

export const getFirebaseData = (colection: string, document: string) =>
  getDoc(doc(db, colection, document)).then((data) => {
    if (data.exists()) {
      return data.data();
    } else {
      throw "Загрузить данные не удалось, попробуйте еще раз";
    }
  });

export const setFirebaseData = async (
  colection: string,
  document: string,
  data: Record<any, any>
) => {
  console.log(data);
  setDoc(doc(db, `${colection}`, `${document}`), data);
};

export const updateFirebaseData = async (
  colection: string,
  document: string,
  updateDocumentKey: string,
  data: Record<any, any>
) => {
  const ref = doc(db, `${colection}`, `${document}`);
  updateDoc(ref, {
    [`${updateDocumentKey}`]: data,
  });
};

export const setFirebaseImage = async (data: any) => {
  const storageRef = ref(storage, `imagePosts/${data.name}`);
  return uploadBytes(storageRef, data).then((uploadTask) => {
    return getDownloadURL(uploadTask.ref);
  });
};

export const signIn = (email: string, pass: string) =>
  signInWithEmailAndPassword(getAuth(), email, pass).then(({ user }) => {
    const userData = {
      email: user.email,
      idUser: user.uid,
      token: user.refreshToken,
      isAuth: true,
    };
    return userData;
  });

export const signUp = (email: string, pass: string, nickname: string) =>
  createUserWithEmailAndPassword(getAuth(), email, pass).then(({ user }) => {
    const userData = {
      email: user.email,
      idUser: user.uid,
      token: user.refreshToken,
      isAuth: true,
    };
    setDoc(doc(db, "users", `${user.email}`), {
      isAdmin: false,
      nickname: nickname,
      workout: null,
      avatarImg: null,
    });
    return userData;
  });

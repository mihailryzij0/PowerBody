import { initializeApp } from "firebase/app";
import { getFirestore, setDoc } from "firebase/firestore"
import { getDoc, doc } from "firebase/firestore";
const firebaseConfig = {

  apiKey: 'AIzaSyBecqwV8Ij8Fep_E03F-5oDgLMQCglfgCQ',
  authDomain: 'powerbody-6330f.firebaseapp.com',
  projectId: 'powerbody-6330f',
  storageBucket: 'powerbody-6330f.appspot.com',
  messagingSenderId: '25674943814',
  appId: '1:25674943814:web:1335da2f6dca624c4ae947',

};


const app = initializeApp(firebaseConfig);
export  const db = getFirestore();
export async function getColectionFirebase(colectionName: string, documentName: string){
  try{
    const respons = await getDoc( doc(db, colectionName , documentName));  
    if(respons.exists()){
      return respons.data()
    }else{
      throw new Error('чтото пошло не так')
    }
      
  } catch(error){
  }
  // const querySnapshot = await getDoc( doc(db, colectionName , documentName));  
  // return querySnapshot.data()
}

// export async  function getFirebaseImg(){
//   const storage = getStorage();
//   const gsReference = sRef(storage, 'gs://powerbody-6330f.appspot.com/image/fon.jpg');
//   let f =  await getDownloadURL(gsReference)
//   return f
// }


export async function setItemFirebase(data:object, documentName: string){
  const cityRef = doc(db, "AllWorkout", `${documentName}`);
  setDoc(cityRef, {data});
}




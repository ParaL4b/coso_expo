import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getStorage, uploadBytes, getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js';
import { 
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

  const firebaseConfig = {
    apiKey: "AIzaSyCT1VRdLEofscHDkdrRwPEC78jsvFQc_lw",
    authDomain: "mi-web-1a262.firebaseapp.com",
    projectId: "mi-web-1a262",
    storageBucket: "mi-web-1a262.appspot.com",
    messagingSenderId: "727175977084",
    appId: "1:727175977084:web:506c932a7376fd7d3311f9",
    measurementId: "G-G7981KBLPW"
  };

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

export const storage = getStorage();


export const saveComent = (user, email, comment, photo) => {
  addDoc(collection(db, 'Prueba0.2'), {user, email, comment, photo})
}

// export const getComment = () => {
//   getDocs(collection(db, 'Comentarios'));
// }
export async function getComment(){
  const querySnapshot = await getDocs(collection(db, "Prueba0.2"));
  return querySnapshot;
}

export async function onGetComment(callback){
  const querySnapshot = await onSnapshot(collection(db, "Prueba0.2"), callback);
  return querySnapshot;
}

export function savePhoto(StorageRef, file){
  uploadBytes(StorageRef, file)
    .then((e) => {
      console.log(e)
      location.href = '../../index.html'
    })
    .catch((errot) => {
      console.log(errot)
    })
}
export async function getPhoto(StorageRef){
  const url = await getDownloadURL(StorageRef);
  return url;
}

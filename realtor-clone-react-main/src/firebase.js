// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT4-Cbxfvt3oNIbrWJ132pwlg2oX2Mfgc",
  authDomain: "realtor-clone-react-c8273.firebaseapp.com",
  projectId: "realtor-clone-react-c8273",
  storageBucket: "realtor-clone-react-c8273.appspot.com",
  messagingSenderId: "575612341729",
  appId: "1:575612341729:web:622699066219e5b8de56a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
export const db = getFirestore()

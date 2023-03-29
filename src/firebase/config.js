import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFn2CtVRZ1vtjNVYcPxZZzNAnRvUyWpJk",
    authDomain: "olx-clone-e64ff.firebaseapp.com",
    projectId: "olx-clone-e64ff",
    storageBucket: "olx-clone-e64ff.appspot.com",
    messagingSenderId: "313682538097",
    appId: "1:313682538097:web:c67155d8d5889056d275d0",
    measurementId: "G-BC96VZW9SF"
  };

 export default firebase.initializeApp(firebaseConfig)
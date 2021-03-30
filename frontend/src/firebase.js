import firebase from 'firebase/app';
import "firebase/auth";


  // Your web app's Firebase configuration

  const firebaseConfig = {
    apiKey: "AIzaSyB701i8MUHd7WAnm3KNPJMXb0nN42B_op4",
    authDomain: "sasa-6409f.firebaseapp.com",
    projectId: "sasa-6409f",
    storageBucket: "sasa-6409f.appspot.com",
    messagingSenderId: "747985366871",
    appId: "1:747985366871:web:2adff09b92316648e45812"
  };
  // Initialize Firebase

  //firebase.initializeApp(firebaseConfig);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

//export 
 
export const auth = firebase.auth() 
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
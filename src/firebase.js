import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDvSeK4ERieaQz31AZvgFd3WCak_KE9iuE",
  authDomain: "newdashtest.firebaseapp.com",
  projectId: "newdashtest",
  storageBucket: "newdashtest.appspot.com",
  messagingSenderId: "306036912072",
  appId: "1:306036912072:web:81208144b2ea7f41295afd",
  measurementId: "G-W7N6VNW7E0"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  

  export {auth,db}
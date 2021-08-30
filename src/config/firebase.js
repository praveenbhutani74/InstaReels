import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyA-KVgpPX5X5op9vyb3Co1YT2z6IMdiGag",
    authDomain: "instareels-eb103.firebaseapp.com",
    projectId: "instareels-eb103",
    storageBucket: "instareels-eb103.appspot.com",
    messagingSenderId: "90445140743",
    appId: "1:90445140743:web:57230bce738d6eef7aaba2"
  };

  firebase.initializeApp(firebaseConfig);

  let provider=new firebase.auth.GoogleAuthProvider();

  export const auth=firebase.auth();

  export const signInWithGoogle=()=>{
      auth.signInWithPopup(provider);
  }


  export default firebase;
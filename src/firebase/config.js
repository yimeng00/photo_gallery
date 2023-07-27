import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAKliBmfGgfywIzbqnGQYGsD-TwR8JsrJg",
  authDomain: "yimeng-photoalbum.firebaseapp.com",
  projectId: "yimeng-photoalbum",
  storageBucket: "yimeng-photoalbum.appspot.com",
  messagingSenderId: "1036696124823",
  appId: "1:1036696124823:web:ae2004fee84ae601bf18d2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };

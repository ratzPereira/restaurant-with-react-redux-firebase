import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCqaPjIXRvdeGWoG9b0xDiwen05gw2wqiY",
  authDomain: "react-http-testing.firebaseapp.com",
  databaseURL:
    "https://react-http-testing-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-http-testing",
  storageBucket: "react-http-testing.appspot.com",
  messagingSenderId: "363977871138",
  appId: "1:363977871138:web:011f6ac4c1db184d909f7b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

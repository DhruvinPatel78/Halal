import app from "firebase/app";
import 'firebase/auth'
import 'firebase/firebase-firestore'

const firebaseApp = app.initializeApp({
    apiKey: "AIzaSyB7n5Mi_wsd8qloOlx53ydMEzJ2sgmKiB8",
    authDomain: "halalmkt.firebaseapp.com",
    databaseURL: "https://halalmkt.firebaseio.com",
    projectId: "halalmkt",
    storageBucket: "halalmkt.appspot.com",
    messagingSenderId: "516294043833",
    appId: "1:516294043833:web:f896bfec75e51ffc8f9368",
    measurementId: "G-ZPJQ54N898"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const user = firebaseApp.auth().currentUser;

export { db,auth,user };
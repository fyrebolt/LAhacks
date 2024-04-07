import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtEWmEswnxOur3OIBAWX1oZ82aPY9-yfE",
  authDomain: "lahacks8.firebaseapp.com",
  databaseURL: "https://lahacks8-default-rtdb.firebaseio.com",
  projectId: "lahacks8",
  storageBucket: "lahacks8.appspot.com",
  messagingSenderId: "1054684978705",
  appId: "1:1054684978705:web:0403789073974326321bb0"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

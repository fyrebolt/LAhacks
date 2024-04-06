import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
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
const database = firebase.database();

const auth = getAuth();

// Email and password parameters can be passed over from html forms

function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
      console.log(`Logged in as ${user}`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(`Signed in as ${user}`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
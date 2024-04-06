// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtEWmEswnxOur3OIBAWX1oZ82aPY9-yfE",
  authDomain: "lahacks8.firebaseapp.com",
  databaseURL: "https://lahacks8-default-rtdb.firebaseio.com",
  projectId: "lahacks8",
  storageBucket: "lahacks8.appspot.com",
  messagingSenderId: "1054684978705",
  appId: "1:1054684978705:web:0403789073974326321bb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = firebase.database();


// function check(){
//   if(localStorage.getItem("loggedIn")!="yes"){
//       window.location.href = "index.html";
//   }
//     email = localStorage.getItem("user")
//     user = email.replaceAll(".","").replaceAll("#","").replaceAll("$",'').replaceAll("[","").replaceAll("]","")
//     user = user.substring(0,user.indexOf("@"))
//     database.ref(user+'/custom').once('value').then((snapshot)=>{
//         current = snapshot.val()
//         if (current == null){
//             current = []
//             sessionStorage.setItem("workout", ["null"])
//         }
//         else {
//             current = current.array
//             sessionStorage.setItem("workout", current)
//         }
//     })
// }

// function checkIndex(){
//   if(localStorage.getItem("loggedIn")=="yes"){
//       window.location.href = "home.html";
//   }
// }

const auth = getAuth();

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
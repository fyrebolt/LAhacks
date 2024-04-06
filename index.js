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
  
const loginButton = document.getElementById('loginSubmit');
const emailField = document.getElementById("emailField")
var passwordField = document.getElementById("passwordField")
const googleLogin = document.getElementById('googleLoginBox')
const errorLabel = document.getElementById('errorLabel')
let user;

passwordField.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    loginButton.click();
  }
});

loginButton.onclick = (event) =>{
    event.preventDefault()
    errorLabel.innerHTML = "."; 
    const email = emailField.value
    const password = passwordField.value
    user = email.replaceAll(".","").replaceAll("#","").replaceAll("$",'').replaceAll("[","").replaceAll("]","")
    user = user.substring(0,user.indexOf("@"))
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    localStorage.setItem("loggedIn","yes")
    localStorage.setItem("name", name)
    localStorage.setItem("user", email)
    window.location.href = "home.html" 
  })
  .catch((error) => {
    errorLabel.className="";
    errorLabel.innerHTML = "Invalid login credentials";    
  });
}

googleLogin.onclick = (event) => {
    event.preventDefault()
    errorLabel.innerHTML = "."; 
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(function(result) {
        localStorage.setItem("loggedIn","yes")
        const profile = result.user.providerData[0];
        const email = profile.email
        const name = profile.displayName
        localStorage.setItem("name", name)
        localStorage.setItem("user", email)
        window.location.href = "home.html"
    }).catch(function(error) {
      errorLabel.className="";
      errorLabel.innerHTML = "Invalid login credentials"; 
    })
}
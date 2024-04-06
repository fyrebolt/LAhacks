import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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
  
const signupButton = document.getElementById('loginSubmit');
const emailField = document.getElementById("emailField")
const nameField = document.getElementById("nameField")
var passwordField = document.getElementById("passwordField")
const googleLogin = document.getElementById('googleLoginBox')
const errorLabel = document.getElementById('errorLabel')
let user;

passwordField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      signupButton.click();
    }
  });

signupButton.onclick = (event) =>{
    event.preventDefault()
    errorLabel.innerHTML = "."; 
    const email = emailField.value
    const password = passwordField.value
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        localStorage.setItem("loggedIn","yes")
        localStorage.setItem("name", name)
        localStorage.setItem("user", email)
        user = email.replaceAll(".","").replaceAll("#","").replaceAll("$",'').replaceAll("[","").replaceAll("]","")
        user = user.substring(0,user.indexOf("@"))
        // database.ref(user+'/data').set({"name": name}).then(()=>{
        //     window.location.href="home.html"
        // })    
    })
    .catch((error) => {
        errorLabel.className="";
        errorMessage = error.message
        errorLabel.innerHTML = errorMessage;    
    })
}


googleLogin.onclick = (event) => {
    event.preventDefault()
    errorLabel.innerHTML = "."; 
    const provider = new GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
        localStorage.setItem("loggedIn","yes")
        profile = result.user.providerData[0];
        name = profile.displayName
        email = profile.email
        localStorage.setItem("name", name)
        localStorage.setItem("user", email)
        user = email.replaceAll(".","").replaceAll("#","").replaceAll("$",'').replaceAll("[","").replaceAll("]","")
        user = user.substring(0,user.indexOf("@"))
        // database.ref(user+'/data').set({"name": name}).then(()=>{
        //     window.location.href="home.html"
        // }) 
    }).catch(function(error) {
        errorLabel.className="";
        errorMessage = error.message
        errorLabel.innerHTML = errorMessage;  
    });
}
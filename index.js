import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

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
    database.ref(user+'/data').once('value').then((snapshot)=>{
        data = snapshot.val()
        name = data.name
    })
auth.signInWithEmailAndPassword(email, password)
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
    provider = new GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
        localStorage.setItem("loggedIn","yes")
        profile = result.user.providerData[0];
        email = profile.email
        name = profile.displayName
        localStorage.setItem("name", name)
        localStorage.setItem("user", email)
        window.location.href = "home.html"
    }).catch(function(error) {
      errorLabel.className="";
      errorLabel.innerHTML = "Invalid login credentials"; 
    })
}
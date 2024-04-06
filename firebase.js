firebase.initializeApp(firebaseConfig);
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
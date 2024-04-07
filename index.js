const button = document.getElementById("button")
const wrapper = document.getElementById("wrapper")
const page2 = document.getElementById("page2")
function load(){
    wrapper.style.transform = "translateY(-25vh)";
    wrapper.style.opacity = "1"
    wrapper.style.transition = "0.75 ease"
}
   

    



button.onclick = async (event) => {
    event.preventDefault()
    wrapper.style.transform = "translateY(100vh)";
    var msg = new SpeechSynthesisUtterance();
    msg.text = "i love men";
    window.speechSynthesis.speak(msg);
    setTimeout(function(){
        wrapper.style.display = "none";
        page2.style.transform = "translateY(0vh)"; 
    }, 750)
    
    
}

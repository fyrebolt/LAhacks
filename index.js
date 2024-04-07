const button = document.getElementById("button")
const wrapper = document.getElementById("wrapper")

function load(){
    wrapper.style.transform = "translateY(0px)";
    wrapper.style.opacity = "1"
    wrapper.style.transition = "0.75 ease"
}

    



button.onclick = async (event) => {
    event.preventDefault()
    setTimeout(function(){
        wrapper.style.display = "none"
        page2.style.display = "flex"
    }, 750)
    wrapper.style.transform = "translateY(700px)";
        
    
    
}

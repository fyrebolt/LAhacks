const button = document.getElementById("button")
const wrapper = document.getElementById("wrapper")
const page2 = document.getElementById("page2")
function load(){
    wrapper.style.transform = "translateY(-25vh)";
    wrapper.style.opacity = "1"
    wrapper.style.transition = "0.75 ease"
}
   
// TODO implement auth if we have extra time

document.addEventListener('DOMContentLoaded', function (event) {
    // array with texts to type in typewriter
    var dataText = ['NotDeafLink', 'NotDeafLink', 'NotDeafLink'];

    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
        // chekc if text isn't finished yet
        if (i < (text.length)) {
            // add next character to header
            document.getElementById('appName').innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

            // wait for a while and call this function again for next character
            setTimeout(function () {
                typeWriter(text, i + 1, fnCallback)
            }, 150);
        }
        // text finished, call callback if there is a callback function
        else if (typeof fnCallback == 'function') {
            // call callback after timeout
            setTimeout(fnCallback, 700);
        }
    }
    // start a typewriter animation for a text in the dataText array
    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined') {
            setTimeout(function () {
                StartTextAnimation(0);
            }, 20000);
        }
        // check if dataText[i] exists
        if (i < dataText[i].length) {
            // text exists! start typewriter animation
            if (i == 1) {
                document.getElementById("appName").style.fontFamily = 'ASL'
            } else {
                document.getElementById("appName").style.fontFamily = 'Red Hat Display'
            }
            typeWriter(dataText[i], 0, function () {
                // after callback (and whole text has been animated), start next text
                StartTextAnimation(i + 1);
            });
        }
    }
    // start the text animation
    StartTextAnimation(0);
});

button.onclick = async (event) => {
    event.preventDefault()
    wrapper.style.transform = "translateY(100vh)";
    setTimeout(function(){
        wrapper.style.display = "none";
        page2.style.transform = "translateY(0vh)"; 
        window.location = 'vision.html'
    }, 750)
}


let handpose;
let video;
let predictions = [];
let sparkleArray = [];
let loadeded = false;


workoutIdeals = {
    "butterfly": [40, 40, 74, 100, 100],
    "downwarddog": [160, 160, 125, 25, 25],
    "crescent": [90, 140, 160, 180, 180],
    "easy": [50, 50, 75, 100, 100],
    "triangle": [180, 180, 150, 50, 150],
    "reversewarrior": [160, 180, 83, 180, 50],
    "tree": [40, 170, 170, 90, 90],
    "warrior1": [180, 180, 145, 90, 90],
    "warrior2": [127, 170, 133, 90, 90],
    "warrior3": [160, 160, 130, 120, 120],

}

letterIdeals = [
    [100, 180, 70, 20, 60, 120], //a
    [90, 80, 280, 320, 300, 230], //b
    [80, 150, 170, 180, 180, 170],
    [60, 30, 210, 5, 20, 40],
    [120, 130, 180, 160, 140, 140], //e
]




function compare(myList) {
    current = myList;
    
    let index = 0;
    let min = 1000;
    for (let i = 0; i < letterIdeals.length; i++){
        let temp = 0;
        for (let j = 1; j < current.length; j++){
            temp += ((current[j] / current[0] - letterIdeals[i][j] / letterIdeals[i][0]) / (letterIdeals[i][j] / letterIdeals[i][0])) ** 2;
            console.log(String.fromCharCode('a'.charCodeAt(0) + i) + "," + j + ": " + ((current[j] / current[0] - letterIdeals[i][j] / letterIdeals[i][0]) / (letterIdeals[i][j] / letterIdeals[i][0])) ** 2);
        }

        if (temp < min){
            min = temp;
            index = i;
        }       
    }

    console.log(min)
    console.log(String.fromCharCode('a'.charCodeAt(0) + index));
    
}

function setup() {
    var canvas = createCanvas(640, 480);
    canvas.parent('frame');
    video = createCapture(VIDEO);
    video.size(windowWidth, windowHeight);
    console.log("setup")
    handpose = ml5.handpose(video, modelReady);
    
    // This sets up an event that fills the global variable "predictions"
    // with an array every time new hand poses are detected
    handpose.on("predict", results => {
      predictions = results;
    });
  
    // Hide the video element, and just show the canvas
    video.hide();
  }

function modelReady(){
    console.log("loaded")
    loadeded = true;
}

function distance(x1, y1, x2, y2) {
    return Math.round(Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)))
}

function getAngle(Ax, Ay, Bx, By, Cx, Cy){
    b=Math.sqrt((Ax - Bx)**2 + (Ay - By)**2)
    a=Math.sqrt((Cx - Bx)**2 + (Cy - By)**2)
    c=Math.sqrt((Ax - Cx)**2 + (Ay - Cy)**2)
    return 57.3 * Math.acos((a**2 + b**2 - c**2) / (2 * a * b))
}

function draw() {
    rotate(PI / 2)
    image(video, 0, 0, width, height);
    if(!loadeded){
        fill(255, 255, 255)
        textSize(42)
        textFont('Verdana');
        filter(BLUR, 8);
        textAlign(CENTER);
        stroke(0, 0, 0)
        text('Loading...', 340, 240);
    } else {
    drawKeypoints()
    }
}

function drawKeypoints() {
good = [0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19]
averagePoints = [0, 1, 2, 5, 9, 17]
goodDistance = [1, 4, 8, 12, 16, 20]
for (let i = 0; i < predictions.length; i += 1) {
    myList = []
    const prediction = predictions[i];
    
    avgX = 0
    avgY = 0
    xStrings = ""
    yStrings = ""
    for (let j = 0; j < averagePoints.length; j += 1) {
        const keypoint = prediction.landmarks[averagePoints[j]];
        avgX += keypoint[0]
        xStrings += String(Math.round(keypoint[0])) + ", " 
        avgY += keypoint[1]
        yStrings += String(Math.round(keypoint[1])) + ", "
    }
    avgX /= averagePoints.length
    avgY /= averagePoints.length
    fill(255, 0, 0)
    ellipse(avgX, avgY, 10, 10);
    
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
    const keypoint = prediction.landmarks[j];
    fill(255,255,255);

    if (goodDistance.includes(j)){
        myList.push(distance(avgX, avgY, keypoint[0], keypoint[1]))
    }
    textSize(12);
    text((String(j) + ": " + String(distance(avgX, avgY, keypoint[0], keypoint[1]))),keypoint[0], keypoint[1] + 20);
    

    if (good.includes(j)){
        const keypoint1 = prediction.landmarks[j+1];
        line(keypoint[0], keypoint[1], keypoint1[0], keypoint1[1])
    }
    stroke(0,0,0);
    ellipse(keypoint[0], keypoint[1], 10, 10);
    }
    //call quality functions here
    
    const keypoint0 = prediction.landmarks[0];
    const keypoint2 = prediction.landmarks[2];
    const keypoint4 = prediction.landmarks[4];
    const keypoint5 = prediction.landmarks[5];
    const keypoint8 = prediction.landmarks[8];
    const keypoint9 = prediction.landmarks[9];
    const keypoint13 = prediction.landmarks[13];
    const keypoint17 = prediction.landmarks[17];
    line(keypoint0[0], keypoint0[1], keypoint17[0], keypoint17[1])
    line(keypoint13[0], keypoint13[1], keypoint17[0], keypoint17[1])
    line(keypoint13[0], keypoint13[1], keypoint9[0], keypoint9[1])
    line(keypoint9[0], keypoint9[1], keypoint5[0], keypoint5[1])
    line(keypoint5[0], keypoint5[1], keypoint2[0], keypoint2[1])
    // compare(myList);
    // currentStretch.innerHTML = getAngle(keypoint4[0], keypoint4[1], keypoint2[0], keypoint2[1], keypoint5[0], keypoint5[1])
}
}

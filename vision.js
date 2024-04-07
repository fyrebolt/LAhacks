let handpose;
let video;
let predictions = [];
let sparkleArray = [];

const timer = document.getElementById("timer")
const currentStretch = document.getElementById("currentStretch")
const nextStretch = document.getElementById("nextStretch")
const accuracy = document.getElementById("accuracy")
const done2 = document.getElementById("done2")

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


currentStretch.innerHTML = "0"

nextStretch.innerHTML = "six"

function setup() {
    createCanvas(640, 480);
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

function getDist(pose, currWorkout, checkTo){
    angles = [0, 0, 0, 0, 0]
    diff=0;
    angles[3] = getAngle(pose.rightWrist.x, pose.rightWrist.y, 
        pose.rightShoulder.x, pose.rightShoulder.y, 
        pose.rightHip.x, pose.rightHip.y)
    angles[4] = getAngle(pose.leftWrist.x, pose.leftWrist.y, 
        pose.leftShoulder.x, pose.leftShoulder.y, 
        pose.leftHip.x, pose.leftHip.y)
    angles[0] = getAngle(pose.rightHip.x, pose.rightHip.y, 
        pose.rightKnee.x, pose.rightKnee.y, 
        pose.rightAnkle.x, pose.rightAnkle.y)
    angles[1] = getAngle(pose.leftHip.x, pose.leftHip.y, 
        pose.leftKnee.x, pose.leftKnee.y, 
        pose.leftAnkle.x, pose.leftAnkle.y)
    angles[2] = getAngle(pose.leftKnee.x, pose.leftKnee.y,
        pose.leftHip.x, pose.leftHip.y, 
        pose.leftShoulder.x, pose.leftShoulder.y)
    //console.log(angles[2])
    for (let i=0; i<checkTo; i++){
        //console.log((angles[i] - currWorkout[i]))
        diff += (angles[i] - currWorkout[i])**2
    }
    proximity = 100 / (1 + 0.05 * Math.pow(1.1, Math.sqrt(diff)-35))
    accuracy.innerHTML = Math.round(proximity * 100) / 100
    return Math.sqrt(diff)
}


function modelReady(){
    console.log("loaded")
}



function getAngle(Ax, Ay, Bx, By, Cx, Cy){
    b=Math.sqrt((Ax - Bx)**2 + (Ay - By)**2)
    a=Math.sqrt((Cx - Bx)**2 + (Cy - By)**2)
    c=Math.sqrt((Ax - Cx)**2 + (Ay - Cy)**2)
    return 57.3 * Math.acos((a**2 + b**2 - c**2) / (2 * a * b))
}

function draw() {
    translate(video.width, 0)
    scale(-1, 1)
    image(video, 0, 0, width, height);
    console.log("draw")
    drawKeypoints()
}

function drawKeypoints() {
good = [0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19]
for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    const keypoint0 = prediction.landmarks[0];
    const keypoint2 = prediction.landmarks[2];
    const keypoint5 = prediction.landmarks[5];
    const keypoint9 = prediction.landmarks[9];
    const keypoint13 = prediction.landmarks[13];
    const keypoint17 = prediction.landmarks[17];
    line(keypoint0[0], keypoint0[1], keypoint17[0], keypoint17[1])
    line(keypoint13[0], keypoint13[1], keypoint17[0], keypoint17[1])
    line(keypoint13[0], keypoint13[1], keypoint9[0], keypoint9[1])
    line(keypoint9[0], keypoint9[1], keypoint5[0], keypoint5[1])
    line(keypoint5[0], keypoint5[1], keypoint2[0], keypoint2[1])
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
    console.log(prediction.landmarks.length)
    const keypoint = prediction.landmarks[j];
    fill(0,0,0);
    text(j,keypoint[0], keypoint[1] + 20);
    //console.log(i)
    if (good.includes(j)){
        const keypoint1 = prediction.landmarks[j+1];
        line(keypoint[0], keypoint[1], keypoint1[0], keypoint1[1])
    }
    stroke(255,150,0);
    ellipse(keypoint[0], keypoint[1], 10, 10);
    // ellipse(keypoint[0], keypoint[1], 10, 10);
    }
}
}

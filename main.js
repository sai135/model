status1 = "";
objects=[];
function preload() {
}
function setup() {
    canvas = createCanvas(480, 300);
    canvas.position(560, 200);
    video=createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video,0,0,480,300);
    if(status1 != "") {
        for(i=0; i < objects.length; i++) {
           percent = floor(objects[i].confidence *100);
           text(objects.label+""+percent+"%"+objects[i].x + 15, objects[i].y + 15);
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           nofill();
           stroke("#FF0000")
        }
       }
}
function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    valueofinput = document.getElementById("input").value;
    objectDetector.detect(video, gotResults);
    for(i=0; i < objects.length; i++) {
    if(objects[i] == valueofinput) {
     video.stop();
     objectDetector.detect(gotResults);
     document.getElementById("status").innerHTML="Detected Objects";
     document.getElementById("number_of_objects").innerHTML = valueofinput+"Found";
     speak()
    
    }else{
        document.getElementById("status").innerHTML="Detected Objects";
        document.getElementById("number_of_objects").innerHTML = valueofinput+" Not Found";  
    }
}
}
function speak() {
    var synth=window.speechSynthesis;
    speech_data1=valueofinput + "Found";
    var utteThis=new SpeechSynthesisUtterance(speech_data1);
    synth.speak(utteThis);
}
function modelLoaded() {
    console.log("Model Loaded!")
    status1 = true;
}
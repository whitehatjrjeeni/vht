song="";
leftWristX=0;
leftWristy=0;
rightWristX=0;
rightWristy=0;
scoreleftwrist=0;

function preload()
{
    song =loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(450,200);

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modeloaded);
    poseNet.on('pose',gotposes);
}
function gotposes(results){
    if(results.length > 0)
    {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("leftwristscour = " + scoreleftwrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftwristX = " + leftWristX +" leftwristY = "+ leftWristy);
         
        rightWristX=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightwristX = " + rightWristX +" rightwristY = "+ rightWristy);
        
    }
}
function modeloaded(){
    console.log("poseNet is initialized");
}
function draw() {
    image(video,0,0,600,500);

    fill("#ff0000");
    stroke("#ff0000");

    console.log("righthigh")

    circle(rightWristX,rightWristy,20);
    if(rightWristy > 0 && rightWristy <=100)
    {
        document.getElementById("speed").innerHTML = "speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristy > 100 && rightWristy <=200)
    {
        document.getElementById("speed").innerHTML = "speed=1x";
        song.rate(1);
    }
    else if(rightWristy > 200 && rightWristy <=300)
    {
        document.getElementById("speed").innerHTML = "speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristy > 300 && rightWristy <=400)
    {
        document.getElementById("speed").innerHTML = "speed=2x";
        song.rate(2);
    }
    else if(rightWristy > 400 && rightWristy <=500)
    {
        document.getElementById("speed").innerHTML = "speed=2.5x";
        song.rate(2.5);
    }

    if(scoreleftwrist > 0.1) 
    {
    circle(leftWristX,leftWristy,20);
    InNumberleftwristy=Number(leftWristy);
    remove_decimals=floor(InNumberleftwristy);
    volume = remove_decimals/500;
    song.setVolume(volume);
    document.getElementById("volume").innerhtml="volume = " + volume;
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

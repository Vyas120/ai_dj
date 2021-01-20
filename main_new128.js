song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_Left = 0;
score_Right = 0;

function preload()
{
	song = loadSound("music.mp3");
}


function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	console.log('PoseNet Is Initialized');
  }

  function gotPoses(results)
  {
	if(results.length > 0)
	{
	  console.log(results);
	  leftWristX = results[0].pose.leftWrist.x;
	  leftWristY = results[0].pose.leftWrist.y;
	  console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

	  rightWristX = results[0].pose.rightWrist.x;
	  rightWristY = results[0].pose.rightWrist.y;
	  console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	  score_Left = results[0].pose.keypoints[9].score;
	  score_Right = results[0].pose.keypoints[10].score;

	}
  }
  

function draw() {
	image(video, 0, 0, 600, 500);
	stroke("orange");
	fill("orange");

	if(score_Left > 0.2){
	circle(leftWristX, leftWristY, 20);
	num_leftWristY = Number(leftWristY);
	remove_dec = Math.floor(num_leftWristY);
	volume = remove_dec/500;
	document.getElementById("volume").innerHTML= "Volume:"+ volume;
	song.setVolume(volume);
	
	}

	if(score_Right > 0.2 ){
		circle(rightWristX, rightWristY, 20);
		
		if(rightWristX >0 && rightWristX <=100){
			document.getElementById("speed").innerHTML= "Speed: 0.5x";
			song.rate(0.5);
		}

		else if(rightWristX >100 && rightWristX <=200){
			document.getElementById("speed").innerHTML= "Speed: 1x"
			song.rate(1);
		}

		else if(rightWristX >200 && rightWristX <=300){
			document.getElementById("speed").innerHTML= "Speed: 1.5x"
			song.rate(1.5);
		}

		else if(rightWristX >300 && rightWristX <=400){
			document.getElementById("speed").innerHTML= "Speed: 2x"
			song.rate(2);
		}

		else if(rightWristX >400 && rightWristX <=500){
			document.getElementById("speed").innerHTML= "Speed: 2.5x"
			song.rate(2.5);
		}
	}
}


function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
